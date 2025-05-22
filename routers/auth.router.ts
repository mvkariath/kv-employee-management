import express from "express";


import EmployeeRepository from "../repositories/employee.repository";
import datasource from "../db/data-source";
import Employee from "../entities/employee.entity";
import { AuthService } from "../services/auth.services";
import { AuthController } from "../controllers/auth.controller";
import { employeeService } from "./employee.router";
const authRouter =  express.Router()

const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
const authService = new AuthService(employeeService);
const athController = new AuthController(authService,authRouter);


export default authRouter;