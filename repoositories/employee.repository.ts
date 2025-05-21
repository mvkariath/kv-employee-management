import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

export class EmployeeRepository{
    constructor(private repository : Repository<Employee>){}

    async create(employee:Employee): Promise<Employee> { 
        return this.repository.save(employee)
    }
    async findMany(): Promise<Employee[]>{
        return this.repository.find();
    }
    async findOne(id:number): Promise<Employee>{
        return this.repository.findOneBy({id});
    }
    async update(id:number,employee:Employee){

        return this.repository.save({id,...employee})
    }
    async deleteOne(id:number){
        return this.repository.delete({id});
    }

}