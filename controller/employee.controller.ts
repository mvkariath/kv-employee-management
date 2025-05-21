import {EmployeeServices} from "../services/employee.service"
import {Request,Response} from 'express'
export class EmployeeController {
     constructor (private employeeServices:EmployeeServices,private router){
          //register the routes to the function
          
          router.get('/',this.getAllEmployees);
          router.get('/:id',this.getSingleEmployee.bind(this))
          router.delete('/:id',this.deleteEmployee.bind(this))
          router.put('/:id',this.updateEmployeeDetails.bind(this))
          router.post('/',this.createEmployee)
     }
     createEmployee = async(req:Request,res:Response)=>{
          const email = req.body.email;
          const name = req.body.name;
          const saved_employee = await this.employeeServices.createEmployee(name,email);
          res.status(201).send(saved_employee)
     }
     getAllEmployees= async(req:Request,res:Response)=>{
          const all_employees= await this.employeeServices.getAllEmployees();
          res.status(200).send(all_employees)
     }
     async getSingleEmployee(req:Request,res:Response){
          const employee_id = req.body.id;
          const single_employee  = await this.employeeServices.getOneEmployee(employee_id)
          res.status(200).send(single_employee)
     }
     async updateEmployeeDetails(req:Request,res:Response){
          const id = req.body.id
          const name = req.body.name
          const email = req.body.email
          const updated_employee = await this.employeeServices.updateEmployee(id,name,email)
          res.status(200).send()
     }

     async deleteEmployee(req:Request,res:Response)
     {
          const id = req.body.id;
          const deleted_employee = await this.employeeServices.deleteEmployee(id)
          res.status(200).send()

     }
}
