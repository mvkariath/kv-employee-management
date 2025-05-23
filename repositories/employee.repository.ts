import Department from "../entities/department.entity";
import Employee from "../entities/employee.entity";
import { DeleteResult, Repository } from "typeorm";

class EmployeeRepository{
    constructor(private repository:Repository<Employee>){
        
    }
    async create(employee: Employee):Promise<Employee>{
        return this.repository.save(employee);
    }
    async findMany():Promise<Employee[]>{
        return this.repository.find({
            relations : {
                address : true,
                department:true 
            }
        });
    }
    async findOneByID(empId:number):Promise<Employee>{
        return this.repository.findOne(
            {
            where: {id: empId},
            relations:{
                address : true,
                department:true
            }
            }
        );
    }
    async update(empId:number, employee:Employee):Promise<void>{
        console.log({...employee});
        await this.repository.save({empId,...employee})
    }

    async delete(empId:number):Promise<void>{
        await this.repository.delete(empId);
    }
    async remove(employee:Employee):Promise<Employee>{
        return this.repository.softRemove(employee);
    }
    async findOneByEmail(email:string){
        return this.repository.findOne({
           where:{ email:email},
        })
    }
    async updateEmployeeDepartment(employee:Employee,department:Department){
        const updated_employee :Employee = {...employee,department:department}
        return this.repository.update(employee.id,updated_employee)
    }

}
export default EmployeeRepository;