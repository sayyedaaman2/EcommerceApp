import { Request, Response, NextFunction } from 'express'
import { Prisma } from "@prisma/client"
import * as Product from '@/model/product.model'
import { AppError } from '@/utils/AppError'
import { paginationHelper } from '@/utils/pagination'

type ProductPayload = Omit<Prisma.ProductCreateInput, "category"> & {
    categoryId: number
}


export const postProduct = async (req: Request, res: Response, next: NextFunction) => {

    const payload: ProductPayload = req.body


    const createdProduct = await Product.createProduct({
        name: payload.name,
        description: payload.description,
        category: {
            connect: {
                id: payload.categoryId
            }
        },
        price: payload.price,
        details: payload.details,
        featuredImage: payload.featuredImage,

    })
    res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: createdProduct
    })

}


export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const productId: number = Number(req.params.id);
        const payload: ProductPayload = req.body;



        const updatedProduct = await Product.updateProductById(productId, {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            details: payload.details,
            featuredImage: payload.featuredImage
        });

        res.status(200).json({
            success: true,
            data: updatedProduct
        })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return next(new AppError("Product not found", 404));
        }

        next(error);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Product.deleteProductById(Number(req.params.id));

        res.status(204).send();

    } catch (error) {

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            return next(new AppError("Product not found", 404));
        }

        next(error);
    }
}

export const findProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let id = Number(req.params.id);

        let product = await Product.getProductById(id)

        if (!product) {
            return next(new AppError("Product not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            data: product
        })
    } catch (error) {
        next(error)
    }
}


export const findAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;

    // ✅ Pagination
    const { page, limit, skip } = paginationHelper(query);

    // ✅ Safe parsing
    const search =
      typeof query.search === "string" ? query.search.trim() : undefined;

    const minPrice = Number(query.minPrice);
    const maxPrice = Number(query.maxPrice);

    const lowToHigh =
      String(query.lowToHigh).toLowerCase() === "true";

    // ✅ WHERE clause (typed)
    const where: Prisma.ProductWhereInput = {};

    // 🔍 Search
    if (search) {
      where.name = {
        contains: search,
      };
    }

    // 💰 Price filter
    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      where.price = {
        ...( !isNaN(minPrice) && { gte: minPrice }),
        ...( !isNaN(maxPrice) && { lte: maxPrice }),
      };
    }

    // 🔃 Sorting (typed)
    const orderBy: Prisma.ProductOrderByWithRelationInput = {
      price: lowToHigh ? "asc" : "desc",
    };

    // ✅ DB query
    const [products, total] = await Promise.all([
      Product.getProducts({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      Product.getCount({ where }),
    ]);

    // ✅ Response
    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addStock = async (req:Request,res:Response, next:NextFunction)=>{
  try{
    const {productId, stocks} = req.body;

    if(!productId || !stocks){
      return next(new AppError("productId and stocks is required.",400))
    }

    if(typeof productId !== "number" || typeof stocks !== "number"){
      return next(new AppError("productId and stocks should be number", 400));
    }

    const updatedStock = await Product.addStock(productId,stocks);

    res.status(200).json({
      success : true,
      message : "Stock added successfully.",
      data : updatedStock
    })
  }catch(error){
    next(error)
  }
}

export const reduceStock = async (req:Request,res:Response, next:NextFunction)=>{
  try{
    const {productId, stocks} = req.body;

    if(!productId || !stocks){
      return next(new AppError("productId and stocks is required.",400))
    }

    if(typeof productId !== "number" || typeof stocks !== "number"){
      return next(new AppError("productId and stocks should be number", 400));
    }

    const reducedStock = await Product.reduceStock(productId,stocks);

    res.status(200).json({
      success : true,
      message : "Stock reduced successfully.",
      data : reducedStock
    })
  }catch(error){
    next(error)
  }
}