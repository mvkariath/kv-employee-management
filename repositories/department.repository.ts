import Department from "../entities/department.entity";
import { DeleteResult, Repository } from "typeorm";

class DepartmentRepository{
    constructor(private repository:Repository<Department>){
        
    }
    async create(department: Department):Promise<Department>{
        return this.repository.save(department);
    }
    async findMany():Promise<Department[]>{
        return this.repository.find();
    }
    async findOneByID(id:number):Promise<Department>{
        return this.repository.findOne(
            {
            where: {id: id},
        
            }
        );
    }
    async findEmployeeInDepartment(id:number){
        return this.repository.findOne(
            {
            where: {id: id},
            relations:{
                employees:true,
            }
        
            }
        );

    }
    async update(dept_id:number, name:string):Promise<void>{
        
        await this.repository.save({id:dept_id,name:name})
    }

    async delete(dept_id:number):Promise<void>{
        await this.repository.softDelete(dept_id);
    }
    async remove(department:Department):Promise<Department>{
        return this.repository.remove(department);
    }
   

}
export default DepartmentRepository;