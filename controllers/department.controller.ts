import { plainToClass, plainToInstance } from "class-transformer";
import HttpException from "../exception/httpException";
import EmployeeRepository from "../repositories/employee.repository";
import { EmployeeService } from "../services/employee.services";
import { isEmailValid } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import {  checkRole } from "../middleware/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
import { DepartmentService } from "../services/department.services";
import { CreateDepartmentDTO } from "../dto/create-department.dto";
import { UpdateDepartmentDTO } from "../dto/update-department.dto";

export class DepartmentController{
    constructor(private departmentService:DepartmentService, router ){
        router.post('/',this.createDepartment.bind(this));
        router.get('/',this.getAllDepartments.bind(this));
        router.get('/:id/employee',this.getAllEmployeesInDepartmen.bind(this));

        // router.get('/:id',this.getEmployeeById, () => {})
        router.get('/:id',this.getDepartmentById.bind(this))
        router.patch('/:id',checkRole([EmployeeRole.DEVELOPER,EmployeeRole.HR]),this.updateDepartmentById.bind(this));
        router.delete('/:id',checkRole([EmployeeRole.DEVELOPER,EmployeeRole.HR]),this.deleteDepartmentById.bind(this));
        router.delete('/remove/:id',this.removeDepartmentById.bind(this));
    }
    async createDepartment(req,res,next){
        try{
        
        const requiredFields = ['name'];
        const data = req.body
        
        const createDepartmentDTO = plainToInstance(CreateDepartmentDTO,data);
        const err = await validate(createDepartmentDTO); 
    
        if (err.length>0){
            console.log(err)
            throw new HttpException(400,"Invalid input");
        }
    
        
            const employee = await this.departmentService.createDepartment(createDepartmentDTO.name);
            res.status(201).send(employee);
        }
        catch(error){
            console.log(error)
            next(error);
        }
    }
    async getAllDepartments(req,res){
        const departments = await this.departmentService.getAllDepartments();
        console.log(req.user)
        // const createEmployeeDto = plainToClass()
        if (!departments){
            res.status(400).send({"error":"No employees found"})
            return;
        }
        res.status(200).send(departments);
    }


    async getAllEmployeesInDepartmen(req,res){
        const dept_id = req.params['id']
        const department_employees = await this.departmentService.getEmployeesInDepartment(dept_id);
        console.log(req.user)
        // const createEmployeeDto = plainToClass()
        if (!department_employees){
            res.status(400).send({"error":"No employees found"})
            return;
        }
        res.status(200).send(department_employees);
    }
    getDepartmentById = async(req,res,next)=>{
        try{
            const dept_id = Number(req.params["id"]);
            const department = await this.departmentService.getDepartmentById(dept_id);
            if (!department){
                
                throw new HttpException(404,"Employee not found")
                
                // res.status(400).send({"error":"No employee found"})
                // return;
            }
            res.status(200).send(department);
        }
        catch(error){
            // console.log(error);
            next(error);
        }
        
    }
    async updateDepartmentById(req,res,next){
        try{
            const dept_id = Number(req.params["id"]);
            const data = req.body;
            const updateDepeartmentDTO = plainToInstance(UpdateDepartmentDTO,data);
            console.log(updateDepeartmentDTO);
            const err = await validate(updateDepeartmentDTO
                ,{skipMissingProperties: true}
            );
            if (err.length>0){
                throw new HttpException(400,"Validation failed");
            }
            // const name = updateEmployeeDto.name;
            // const email = updateEmployeeDto.email;
            // const address = updateEmployeeDto.address
            // const age = updateEmployeeDto.age;
            await this.departmentService.updateDepartmentById(dept_id,updateDepeartmentDTO.name);
            const employee = await this.departmentService.getDepartmentById(dept_id);
            res.status(200).send(employee);
        }
        catch(err){
            next(err);
        }
       
    }

    
    async deleteDepartmentById(req,res){
        const dept_id = Number(req.params["id"]);
        const department = await this.departmentService.getDepartmentById(dept_id);
        await this.departmentService.deleteDepartmentById(dept_id);
        res.status(200).send(department);
    }
    async removeDepartmentById(req,res){
        const dept_id = Number(req.params["id"]);
        const department = await this.departmentService.getDepartmentById(dept_id);
        await this.departmentService.removeDepartmentById(department);
        res.status(200).send(department);
    }
}