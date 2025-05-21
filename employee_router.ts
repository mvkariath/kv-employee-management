import express from "express";
import Employee from "./employee.entity";
import datasource from "./data-source";
import { Entity } from "typeorm";

const employeeRouter = express.Router();
const employeeRepository = datasource.getRepository(Employee) //adding an extra layer on the database for more security and convenience

//Get all users
employeeRouter.get("/", async(req, res) => {
 
  const employees = await employeeRepository.find()
  res.status(200).send(employees);
});

//Get Single User
employeeRouter.get("/:id", async(req, res) => {
  const search_employee_id  = req.params.id
  console.log(search_employee_id)
 
  const retreived_employee = await employeeRepository.findOneBy({id:search_employee_id})
  res.status(200).send(retreived_employee);
});

//Adding
employeeRouter.post("/", async(req, res) => {
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
 
  const added_employee = await employeeRepository.save(newEmployee)
  res.status(200).send(added_employee);
});

//Delete
employeeRouter.delete("/:id", async(req, res) => {
  const delete_employee_id  = req.params.id
  const deleted_employee = await employeeRepository.delete({id:delete_employee_id})
  res.status(200).send(deleted_employee);
});

//Put
employeeRouter.put("/:id", async(req, res) => {
  const update_employee_id  = req.params.id
  const updated_email = req.body.email;
  const updated_name = req.body.name;
  const updated_time = new Date();
  if (!updated_email || !updated_name) {res.status(400).send('All fields not available')
    return
  }
  const updated_employee = await employeeRepository.update(update_employee_id,{email:updated_email,name:updated_name,updatedAt:updated_time})
  res.status(200).send(updated_employee);
});


// Patch
employeeRouter.patch("/:id", async(req, res) => {
  const update_employee_id  = req.params.id
  const updated_email = req.body.email;
  const updated_name = req.body.name;
  const updated_time = new Date();
  const update_object = { }
  if (updated_name){
    update_object["name"]=updated_name
    update_object["updatedAt"] = updated_time;
  }
  if (updated_email){
    update_object["email"]=updated_email
    update_object["updatedAt"] = updated_time;
  }
  const updated_employee = await employeeRepository.update(update_employee_id,update_object)
  res.status(200).send(updated_employee);
});
export default employeeRouter;
