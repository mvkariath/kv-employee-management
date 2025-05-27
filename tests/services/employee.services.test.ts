import { EmployeeService } from '../../services/employee.services';
import {when} from 'jest-when'
import { MockProxy,mock } from 'jest-mock-extended';
import { ExpoLegacyDriver } from 'typeorm/driver/expo/legacy/ExpoLegacyDriver.js';
import EmployeeRepository from '../../repositories/employee.repository';
import Employee, { EmployeeRole, EmployeeStatus } from '../../entities/employee.entity';
import HttpException from '../../exception/httpException';
import { DepartmentService } from '../../services/department.services';
import Address from '../../entities/address.entity';

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

            expect(result).toBeInstanceOf(HttpException)

        })
    })
    //test to delete employee by id
    describe('deleteEmployeeById',()=>{
        it('delet an employee if the id exists',async()=>{
            const testEmployee = new Employee ()
            
            when(employeeRepository.delete).calledWith(2).mockReturnValue(undefined);
            
            const result =  await employeeService.deleteEmployeeById(2);

            expect(result).toBeUndefined()

        })
        it('no employee found with this id',async()=>{

            when(employeeRepository.delete).calledWith(2).mockReturnValue(undefined);
            
            const result =  await employeeService.deleteEmployeeById(2);

            expect(result).toBeUndefined()

        })
    })
    //test to create employee
    describe('createEmployee', () => {
        it('creates employee successfully', async () => {
            const mockDepartment = { id: 1, name: 'HR' };
            const mockEmployeeDto = {
                name: 'HR',
                email: 'hr@kv.com',
                age: 30,
                role: EmployeeRole.HR,
                status: EmployeeStatus.ACTIVE,
                dateOfJoining: new Date(),
                experience: 5,
                employeeId: 'EMP001',
                password: 'hrpasss',
                address: { line1: 'line1',line2:'line2',houseNo:123, pincode: 12345 },
                department_id: 1
            };
            
            when(departmentService.getDepartmentById).calledWith(1).mockReturnValue(mockDepartment);
            when(employeeRepository.create).calledWith(expect.anything()).mockReturnValue({ ...mockEmployeeDto, id: 1 });
            
            const result = await employeeService.createEmployee(mockEmployeeDto);
            
            expect(result).toHaveProperty('id', 1);
            expect(departmentService.getDepartmentById).toHaveBeenCalledWith(1);
            expect(employeeRepository.create).toHaveBeenCalled();
        });
        
        it('throws exception when department not found', async () => {
            const mockEmployeeDto = {
                 name: 'HR',
                email: 'hr@kv.com',
                age: 30,
                role: EmployeeRole.HR,
                status: EmployeeStatus.ACTIVE,
                dateOfJoining: new Date(),
                experience: 5,
                employeeId: 'EMP001',
                password: 'hrpasss',
                address: { line1: 'line1',line2:'line2',houseNo:123, pincode: 12345 },
                department_id: 999
            };
            
            when(departmentService.getDepartmentById).calledWith(999).mockReturnValue(null);
            
            const result = employeeService.createEmployee(mockEmployeeDto);
            
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toThrow('Department Not Found !!');
        });
    });
    //test to update employee by email id
    describe('updateEmployeeById', () => {
        it('updates employee successfully', async () => {
            const mockEmployee = new Employee();
            mockEmployee.id = 1;
            mockEmployee.name = 'Mathaiiii';
            const addressInstance = new Address();
            addressInstance.line1 = 'Old Address';
            addressInstance.line2 = 'line2';
            addressInstance.houseNo = 123;
            addressInstance.pincode = 124;
            addressInstance.employee = mockEmployee;
            mockEmployee.address = addressInstance;
            
            const mockDepartment = { id: 2, name: 'HR' };
            const updateDto = {
                name: 'Mathewwww',
                email: 'mvk@gmail.com',
                age:32,
                address: { line1: 'Mathewww', pincode: 12345, line2:'line2',houseNo:123 },
                department_id: 2
            };
            
            when(employeeRepository.findOneByID).calledWith(1).mockReturnValue(mockEmployee);
            when(departmentService.getDepartmentById).calledWith(2).mockReturnValue(mockDepartment);
            
            await employeeService.updateEmployeeById(1, updateDto);
            
            expect(employeeRepository.update).toHaveBeenCalled();
        });
        
        it('throws exception when department not found', async () => {
            const mockEmployee = new Employee();
            mockEmployee.id = 1;
            
            const updateDto = {
                name: 'Mathewww',
                department_id: 999
            };
            
            when(employeeRepository.findOneByID).calledWith(1).mockReturnValue(mockEmployee);
            when(departmentService.getDepartmentById).calledWith(999).mockReturnValue(null);
            
            const result = employeeService.updateEmployeeById(1, {
                name: 'Mathewww',
                email: 'test@gmail.com',
                age: 30,
                address: { line1: 'Test Address', line2: 'line2', houseNo: 123, pincode: 12345 },
                department_id: 999
            });
            
            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toThrow('Department Not found');
        });
    });
    //test to get employee email
    
    describe('getEmployeeByEmail', () => {
        it('returns employee when found by email', async () => {
            const mockEmployee = new Employee();
            mockEmployee.id = 1;
            mockEmployee.email = 'test@example.com';
            
            when(employeeRepository.findOneByEmail).calledWith('test@example.com').mockReturnValue(mockEmployee);
            
            const result = await employeeService.getEmployeeByEmail('test@example.com');
            
            expect(result).toEqual(mockEmployee);
        });
        
        it('returns null when employee not found by email', async () => {
            when(employeeRepository.findOneByEmail).calledWith('notfound@example.com').mockReturnValue(null);
            
            const result = await employeeService.getEmployeeByEmail('notfound@example.com');
            
            expect(result).toBeNull();
        });
    });
    //it removed emloyee by id
    describe('removeEmployeeById', () => {
        it('removes employee successfully', async () => {
            const mockEmployee = new Employee();
            mockEmployee.id = 1;
            
            when(employeeRepository.remove).calledWith(mockEmployee).mockReturnValue(mockEmployee);
            
            await employeeService.removeEmployeeById(mockEmployee);
            
            expect(employeeRepository.remove).toHaveBeenCalledWith(mockEmployee);
        });
    });
})
