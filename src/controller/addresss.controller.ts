import {NextFunction, Request, Response} from 'express';
import {Prisma} from '@prisma/client';

import * as AddressModel from '@/model/address.model';
import { AppError } from '@/utils/AppError';


export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = 11;
        // const userId = req.user.id; // 🔥 real source

        const { street, landmark, city, state, country, pincode } = req.body;

        if (!street || !city || !state || !country || !pincode) {
            throw new AppError("Missing required fields", 400);
        }

        const address = await AddressModel.createAddress(userId, {
            street,
            landmark,
            city,
            state,
            country,
            pincode
        });

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: address
        });

    } catch (error) {
        next(error);
    }
};

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const userId = req.user.id;
        //mock data
        const userId =11;
        const id = Number(req.params.id);

        if (!id) {
            throw new AppError("Invalid address id", 400);
        }

        const payload = req.body;

        const result = await AddressModel.updateAddressById(id, userId, payload);

        if (result.count === 0) {
            throw new AppError("Address not found or unauthorized", 404);
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully"
        });

    } catch (error) {
        next(error);
    }
};

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const userId = req.user.id;
        //mock data
        const userId =11;
        const id = Number(req.params.id);

        if (!id) {
            throw new AppError("Invalid address id", 400);
        }

        const result = await AddressModel.deleteAddressById(id, userId);

        if (result.count === 0) {
            throw new AppError("Address not found or unauthorized", 404);
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};