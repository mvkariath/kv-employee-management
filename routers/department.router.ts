import express from "express";
import datasource from "../db/data-source";
import Department from "../entities/department.entity";
import DepartmentRepository from "../repositories/department.repository";
import { DepartmentService } from "../services/department.services";
import { DepartmentController } from "../controllers/department.controller";
import { employeeService } from "./employee.router";
const departmentRouter = express.Router();
const departmentRepository = new DepartmentRepository(datasource.getRepository(Department));
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService,departmentRouter);

export {departmentService}
export default departmentRouter;