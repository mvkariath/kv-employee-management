//get the employee repo and do te business logic here 
import Employee from "../entities/employee.entity"
import {EmployeeRepository} from "../repoositories/employee.repository"
export class EmployeeServices { 
    constructor(private employeeRepository:EmployeeRepository){
    }
    async createEmployee(name:string,email:string){
        
        const new_employee = new Employee()
        new_employee.email = email;
        new_employee.name = name;
        return this.employeeRepository.create(new_employee);

    }

    async getAllEmployees(){

        return this.employeeRepository.findMany()
    }
    async getOneEmployee(id:number){

        return this.employeeRepository.findOne(id)
    }
    async deleteEmployee(id:number){
        
        const existingEmployee = await this.employeeRepository.findOne(id)
        if(existingEmployee){
        return this.employeeRepository.deleteOne(id)}
    }
    async updateEmployee(id:number,name:string,email:string){

        const existingEmployee = await this.employeeRepository.findOne(id)
        if(existingEmployee){
            const new_employee  = new Employee()
            new_employee.name = name;
            new_employee.email = email; 
            return this.employeeRepository.update(id,new_employee)
        }
       
    }
}