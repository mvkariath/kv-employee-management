
import HttpException from '../exception/httpException';
import { LoggerService } from './logger.services';
import DepartmentRepository from '../repositories/department.repository';
import Department from '../entities/department.entity';


export class DepartmentService{
    private logger = LoggerService.getInstance(DepartmentService.name)
    constructor(private departmentRepository:DepartmentRepository){

    }
    async createDepartment(name:string):Promise<Department>{
        const new_dept = new Department()
        new_dept.name = name
        return this.departmentRepository.create(new_dept);
    }
    async getAllDepartments():Promise<Department[]>{
        return this.departmentRepository.findMany();
    }
    async getEmployeesInDepartment(dept_id:number){
        const department_employees= await this.departmentRepository.findEmployeeInDepartment(dept_id);
        this.logger.info('Fetched the employees in department')
        return department_employees;
    }

    async getDepartmentById(dept_id:number):Promise<Department>{
        const department =  this.departmentRepository.findOneByID(dept_id);
        this.logger.info('Fetched department by ID')
        if(!department)throw new HttpException(402,'Not Found')
        return department;
    }
    async updateDepartmentById(dept_id:number,name:string):Promise<void>{
        const department = await this.departmentRepository.findOneByID(dept_id);
        if (department){

            await this.departmentRepository.update(dept_id,name);
        }
    }

   
    async deleteDepartmentById(dept_id:number):Promise<void>{
        await this.departmentRepository.delete(dept_id);
    }
    async removeDepartmentById(department:Department):Promise<void>{
        await this.departmentRepository.remove(department);
    }

}