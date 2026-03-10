import { NextFunction, Request, Response } from "express";
import * as UserModel from '@/model/user.model'
import { Prisma} from "@prisma/client";
import { comparePassword, hashPassword } from "@/utils/password.util";
import { AppError } from "@/utils/AppError";
import { generateToken } from "@/utils/jwt.util";
import { AuthRequest } from "@/middleware/auth.middleware";


type RegisterPayload = Omit<Prisma.UserCreateInput, "passwordHash" | "role"> & { password : string; roleId : number}
type LoginPayload = Prisma.UserGetPayload<{select:{
    email : true,
    password : true
}}>

type SafeUser = Prisma.UserGetPayload<{omit : {
    passwordHash : true
}}> & {
    token : string;
}

export const registerUser = async (req:Request,res:Response,next:NextFunction)=>{

    const payload:RegisterPayload = req.body;

    // checking username and email is exists

    const emailExists = await UserModel.getUserByEmail(payload.email);

    if(emailExists){
        return next(new AppError("email already exists",400))
    }


const userNameExists = await UserModel.getUserByUserName(payload.username);

    if(userNameExists){
        return next(new AppError("username already exists",400))
    }

    

    const passwordHash = await hashPassword(payload.password); 
    
    const userCreated = await UserModel.createUser({
    name: payload.name,
    email: payload.email,
    username: payload.username,
    passwordHash,
    role: {
      connect: { id: payload.roleId || 2 }
    }
  });

  const {passwordHash:_passwordHash, ...safeUser} = userCreated
    res.status(201).json({
        sucess : true,
        message : "User created successfully",
        data : safeUser,
    })
}

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{

    const {email,password}:LoginPayload = req.body;
    
    // checking username and email is exists

    const emailExists = await UserModel.getUserByEmail(email);

    if(!emailExists){
        return next(new AppError("email id not found",404))
    }

    const isPasswordMatch = await comparePassword(password,emailExists.passwordHash)
    
    if(!isPasswordMatch){
        return next(new AppError("Invalid Crediantials", 400))
    }
    const {passwordHash:_, ...user} = emailExists;
    


    let tokenObject = {
        id : user.id,
        name : user.name,
        username : user.username,
        roleId : user.roleId
    }

    const token = generateToken(tokenObject);
    const safeUser:SafeUser = {
        ...user,
        token
    }
  
    res.status(201).json({
        sucess : true,
        message : "User created successfully",
        data : safeUser,
    })
}



export const userAuthentication = async (req:AuthRequest,res:Response,next: NextFunction)=>{


    res.status(200).json({
        success : true,
        message : "User Authenticated",
        data : req.user
    })
}