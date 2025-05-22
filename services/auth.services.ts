import bcrypt from 'bcrypt'
import HttpException from "../exception/httpException";
import { EmployeeService } from "./employee.services";

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
        return 'Success'
        
        
    
    }

}