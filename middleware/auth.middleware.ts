import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import HttpException from '../exception/httpException';
import { JWT_SECRET } from '../utils/constants';
import { JWTPayload } from '../dto/jwt-payload';
import { EmployeeRole } from '../entities/employee.entity';
function getToken(req:Request){
    let token = req.headers.authorization;
    if (!token){
        throw new HttpException(401,'Not Authorized')
    }
    const tokenSplits = token.split(' ')
    if (tokenSplits.length !=2){
        throw new HttpException(401,'Invalid Token')
    }
    return tokenSplits[1]
}
export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const token = getToken(req)
    if (!token){
        throw new HttpException(401,'Not Authorized')
    }
    try{ 
        const payload = jwt.verify(token,JWT_SECRET) as JWTPayload;
        req.user = payload
        console.log(payload)
    }
    catch{
        throw new HttpException(401,'Invalid or Expired Token')
    }

    next()
    
}