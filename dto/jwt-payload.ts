import { EmployeeRole } from "../entities/employee.entity"

export class JWTPayload{
    id:number
    email:string
    role:EmployeeRole
}