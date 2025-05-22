import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import HttpException from '../exception/httpException';
import { JWT_SECRET } from '../utils/constants';
import { JWTPayload } from '../dto/jwt-payload';
import { EmployeeRole } from '../entities/employee.entity';
export const checkRole= ( acceptedRoles:EmployeeRole[])=>{
 return (req:Request,res:Response,next:NextFunction)=>{
    {
    if (!acceptedRoles.includes(req.user.role) ){
        throw new HttpException(403,'Not Authorized to access the API')
    }}
    
    next()
}}