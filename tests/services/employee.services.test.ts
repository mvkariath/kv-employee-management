import { EmployeeService } from '../../services/employee.services';
import {when} from 'jest-when'
import { MockProxy,mock } from 'jest-mock-extended';
import { ExpoLegacyDriver } from 'typeorm/driver/expo/legacy/ExpoLegacyDriver.js';
import EmployeeRepository from '../../repositories/employee.repository';
import Employee from '../../entities/employee.entity';
import HttpException from '../../exception/httpException';
import { DepartmentService } from '../../services/department.services';

describe('EmployeeService', () => {
    let employeeRepository : MockProxy<EmployeeRepository>;
    let employeeService : EmployeeService;
    let departmentService:DepartmentService;

    beforeEach(()=>{
        employeeRepository = mock<EmployeeRepository>();
        departmentService = mock<DepartmentService>();
        employeeService =new EmployeeService(employeeRepository,departmentService);

    })
    //Unit test for getting the employee By ID
    describe('getEmployeeByID',()=>{
        it('if user exist then get details',async()=>{

            const testEmployee = new Employee ()
            when(employeeRepository.findOneByID).calledWith(2).mockReturnValue(testEmployee);
            
            const result =  await employeeService.getEmployeeById(2);

            expect(result).toEqual(testEmployee)

        })

         it('if user exist not then get null',()=>{

            
            when(employeeRepository.findOneByID).calledWith(4).mockReturnValue(null);
            
            const result = employeeService.getEmployeeById(4);

            expect(result).rejects.toThrow(HttpException)

        })

    })
    //Unit test for getting all the employees
    describe('getAllEmployees',()=>{
        it('get details of all employees',async()=>{

            let employeeList:Employee[]=[];
            for(var i=0;i<5;++i){

                const new_employee = new Employee()
                employeeList.push(new_employee)

            }
            when(employeeRepository.findMany).calledWith().mockReturnValue(employeeList);
            
            const result =  await employeeService.getAllEmployees();

            expect(result).toEqual(employeeList)

        })
        it('no employees found',async()=>{

            when(employeeRepository.findMany).calledWith().mockReturnValue(new HttpException(402,'No Employees Found'));
            
            const result =  await employeeService.getAllEmployees();

            expect(result).toThrow(HttpException)

        })
    })

    describe('deleteEmployeeById',()=>{
        it('delet an employee if the id exists',async()=>{
            const testEmployee = new Employee ()
            
            when(employeeRepository.delete).calledWith(2).mockReturnValue(testEmployee);
            
            const result =  await employeeService.deleteEmployeeById(2);

            expect(result).toEqual(testEmployee)

        })
        it('no employee found with this id',async()=>{

            when(employeeRepository.delete).calledWith(2).mockReturnValue(new HttpException(402,'No Employees Found'));
            
            const result =  await employeeService.deleteEmployeeById(2);

            expect(result).toThrow(HttpException)

        })
    })

})
