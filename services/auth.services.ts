import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import HttpException from "../exception/httpException";
import { EmployeeService } from "./employee.services";
import { JWTPayload } from '../dto/jwt-payload';
import { JWT_SECRET, JWT_VALIDITY } from '../utils/constants';

export class AuthService{
    constructor(private employeeService:EmployeeService){

    }
    async loginUser(email:string,password:string) {
        const user = await this.employeeService.getEmployeeByEmail(email)
        if (!user){
            throw new HttpException(404,'No such user!!')
        }
        console.log(user);
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){throw new HttpException(400,'Invalid Password')}
        const payload:JWTPayload = {
            id:user.id,
            email : user.email,
            role:user.role
        }
        console.log()
        const jwt_token = jwt.sign(payload,JWT_SECRET,{expiresIn:JWT_VALIDITY})// donto keep sensitive information
        return {
            tokenType:'Bearer',
            accessToken: jwt_token
        }
        
        
    
    }

}