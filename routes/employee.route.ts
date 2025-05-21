import express from 'express'
import { EmployeeRepository } from '../repoositories/employee.repository';
import datasource from '../db/data-source';
import Employee from '../entities/employee.entity';
import { EmployeeServices } from '../services/employee.service';
import { EmployeeController } from '../controller/employee.controller';


const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
const employeeService = new EmployeeServices(employeeRepository)
const employeeController = new EmployeeController(employeeService,employeeRouter);

export default employeeRouter;

