import bcrypt from 'bcrypt'
import { CreateAddressDto } from '../dto/create-addres.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import Address from '../entities/address.entity';
import Employee, { EmployeeRole } from '../entities/employee.entity';
import EmployeeRepository from '../repositories/employee.repository'
import HttpException from '../exception/httpException';
import { LoggerService } from './logger.services';
import Department from '../entities/department.entity';
import { DepartmentService } from './department.services';
import { CreateEmployeeDto } from '../dto/create-employee.dto';

export class EmployeeService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    constructor(private employeeRepository:EmployeeRepository,private departmentService:DepartmentService){

    }
    async createEmployee(newEmployee:CreateEmployeeDto):Promise<Employee>{
        const employee = new Employee();
        employee.name = newEmployee.name;
        employee.email = newEmployee.email;
        employee.age = newEmployee.age;
        employee.role= newEmployee.role;
        employee.status = newEmployee.status;
        employee.dateOfJoining = new Date(newEmployee.dateOfJoining);
        employee.experience = newEmployee.experience;
        employee.employeeId = newEmployee.employeeId;
        employee.password = await bcrypt.hash(newEmployee.password,10);

        employee.address = newEmployee.address as Address;

        const department = await this.departmentService.getDepartmentById(newEmployee.department_id)
        if (!department){throw new HttpException(402,'Department Not Found !!')}
        employee.department = department;
        return this.employeeRepository.create(employee);
    }
    async getAllEmployees():Promise<Employee[]>{
        return this.employeeRepository.findMany();
    }
    async getEmployeeById(empId:number):Promise<Employee>{
        const employee =  this.employeeRepository.findOneByID(empId);
        if(!employee)throw new HttpException(402,'Not Found')
        return employee;
    }
    async updateEmployeeById(empId:number,updateEmployeeDto:UpdateEmployeeDto):Promise<void>{
        const employee = await this.employeeRepository.findOneByID(empId);
        const department  = await this.departmentService.getDepartmentById(updateEmployeeDto.department_id)
        if (!department){ throw new HttpException(402,'Department Not found')};
        if (employee){
            if (updateEmployeeDto.address != null){
                this.logger.info("We have an employee")
                if (!employee.address) {
                    employee.address = new Address();   
                }
                if (updateEmployeeDto.address.line1){
                    employee.address.line1 = updateEmployeeDto.address.line1
                }if (updateEmployeeDto.address.pincode){
                    employee.address.pincode = updateEmployeeDto.address.pincode
                }
                // employee.address = updateEmployeeDto.address as Address
            }
            if (updateEmployeeDto.age!= null){
                employee.age = updateEmployeeDto.age;
            }
            if (updateEmployeeDto.name!= null){
                employee.name = updateEmployeeDto.name;
            }
            if (updateEmployeeDto.email){
                this.logger.info("Employee has email")
                employee.email = updateEmployeeDto.email;
            }
            employee.updatedAt = new Date();
            employee.department = department;
            console.log("Modified :",employee);
            await this.employeeRepository.update(empId,employee);
        }
    }
    async deleteEmployeeById(empId:number):Promise<void>{
        await this.employeeRepository.delete(empId);
    }
    async removeEmployeeById(employee:Employee):Promise<void>{
        await this.employeeRepository.remove(employee);
    }

    async getEmployeeByEmail(email:string){
        return this.employeeRepository.findOneByEmail(email);
    }
}