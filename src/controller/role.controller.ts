import { Request, Response, NextFunction } from 'express';
import * as Role from '@/model/role.model';
import { AppError } from '@/utils/AppError';
export const postRole = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const existingRole = await Role.getRoleByName(name);

    if (existingRole) {
        return next(new AppError('Role already exists', 409));
    }

    const createdRole = await Role.createRole({ name });

    res.status(201).json({
        success: true,
        message: 'Role created successfully.',
        data: createdRole,
    });
};
export const updateRoleById = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const existingRole = await Role.getRoleById(id);

    if (!existingRole) {
        return next(new AppError('Role not found', 404));
    }

    const updatedRole = await Role.updateRoleById(id, { name });

    res.status(200).json({
        success: true,
        message: 'Role updated successfully',
        data: updatedRole,
    });
};

export const getRoles = async (req: Request, res: Response, _next: NextFunction) => {
    const roles = await Role.getRoles();
    res.status(201).json({
        success: true,
        message: 'roles fetched successfully.',
        data: roles,
    });
};

export const getRoleById = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const role = await Role.getRoleById(Number(id));
    if (!role) {
        return next(new AppError('role not found', 404));
    }
    res.status(201).json({
        success: true,
        message: 'roles fetched successfully.',
        data: role,
    });
};
