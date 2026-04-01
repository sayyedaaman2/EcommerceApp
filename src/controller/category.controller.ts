import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import * as Category from '@/model/category.model';
import { AppError } from '@/utils/AppError';

type CategoryPayload = Prisma.CategoryCreateInput;

export const postCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { name }: CategoryPayload = req.body;

    // check name already exists

    const category = await Category.getCategoryByName(name);

    if (category) {
        return next(new AppError('Category already exists.', 400));
    }

    const createdCategory = await Category.createCateogry({ name });

    res.status(201).send({
        success: true,
        message: 'Category created',
        data: createdCategory,
    });
};
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const { name }: CategoryPayload = req.body;
    // check name already exists

    const category = await Category.getCateogryById(id);

    if (!category) {
        return next(new AppError('Category not found.', 404));
    }

    const updatedCategory = await Category.updateCateogryById(id, { name });

    res.status(200).send({
        success: true,
        message: 'Category created',
        data: updatedCategory,
    });
};

export const getAllCategories = async (req: Request, res: Response, _next: NextFunction) => {
    const Categories = await Category.getCategories();

    res.status(200).send({
        success: true,
        message: 'Category List Fetched',
        data: Categories,
    });
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    const singleCategory = await Category.getCateogryById(id);

    if (!singleCategory) {
        return next(new AppError('Category not found', 404));
    }

    res.status(200).send({
        success: true,
        message: 'Category List Fetched',
        data: singleCategory,
    });
};
