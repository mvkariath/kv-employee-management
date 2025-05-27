import EmployeeRepository from "../../repositories/employee.repository";
import { Repository, DeleteResult } from "typeorm";
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import Employee from "../../entities/employee.entity";
import Department from "../../entities/department.entity";

describe('EmployeeRepo', () => {
    let repository: MockProxy<Repository<Employee>>;
    let employeeRepository: EmployeeRepository;

    beforeEach(() => {
        repository = mock<Repository<Employee>>();
        employeeRepository = new EmployeeRepository(repository);
    });

    describe('create', () => {
        it("creates a new employee", async () => {
            const mockEmployee = { 
                id: 1, 
                name: "Mathew",
                email: "mathew@kv.com" 
            } as Employee;
            
            when(repository.save).calledWith(mockEmployee).mockReturnValue(mockEmployee);

            const result = await employeeRepository.create(mockEmployee);

            expect(result).toEqual(mockEmployee);
            expect(repository.save).toHaveBeenCalledWith(mockEmployee);
        });
    });

    describe('findMany', () => {
        it("get all emmployye with details", async () => {
            const mockEmployees = [
                { id: 1, name: "Tom", email: "tom@gmail.com" } as Employee,
                { id: 2, name: "John", email: "john@gmail.com" } as Employee
            ];
            
            when(repository.find).calledWith({
                relations: {
                    address: true,
                    department: true
                }
            }).mockReturnValue(mockEmployees);

            const result = await employeeRepository.findMany();

            expect(result).toEqual(mockEmployees);
            expect(repository.find).toHaveBeenCalledWith({
                relations: {
                    address: true,
                    department: true
                }
            });
        });
    });

    describe('findOneByID', () => {
        it("get employee by id", async () => {
            const empId = 1;
            const mockEmployee = { 
                id: empId, 
                name: "Mathew",
                email: "mathew@gmail.com",
                address: { line1: "line 1", pincode: 12345 },
                department: { id: 1, name: "DEV" }
            } as Employee;
            
            when(repository.findOne).calledWith({
                where: { id: empId },
                relations: {
                    address: true,
                    department: true
                }
            }).mockReturnValue(mockEmployee);

            const result = await employeeRepository.findOneByID(empId);

            expect(result).toEqual(mockEmployee);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: empId },
                relations: {
                    address: true,
                    department: true
                }
            });
        });

        it("gives null when no employee is found", async () => {
            const empId = 999;
            
            when(repository.findOne).calledWith({
                where: { id: empId },
                relations: {
                    address: true,
                    department: true
                }
            }).mockReturnValue(null);

            const result = await employeeRepository.findOneByID(empId);

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it("updates an employee's information", async () => {
            const empId = 1;
            const mockEmployee = { 
                name: "MathewUpdated",
                email: "mathew.updated@gmail.com"
            } as Employee;
            
            when(repository.save).calledWith({ empId, ...mockEmployee }).mockResolvedValue(undefined);

            await employeeRepository.update(empId, mockEmployee);

            expect(repository.save).toHaveBeenCalledWith({ empId, ...mockEmployee });
        });
    });

    describe('delete', () => {
        it("permanently removes an employee record by ID", async () => {
            const empId = 1;
            const deleteResult = { affected: 1 } as DeleteResult;
            
            when(repository.delete).calledWith(empId).mockResolvedValue(deleteResult);

            await employeeRepository.delete(empId);

            expect(repository.delete).toHaveBeenCalledWith(empId);
        });
    });

    describe('remove', () => {
        it("performs a soft delete on an employee entity", async () => {
            const mockEmployee = { 
                id: 1, 
                name: "Mathew",
                email: "mathew@gmail.com" 
            } as Employee;
            
            when(repository.softRemove).calledWith(mockEmployee).mockReturnValue(mockEmployee);

            const result = await employeeRepository.remove(mockEmployee);

            expect(result).toEqual(mockEmployee);
            expect(repository.softRemove).toHaveBeenCalledWith(mockEmployee);
        });
    });

    describe('findOneByEmail', () => {
        it("get an employee by email", async () => {
            const email = "mathew@kv.com";
            const mockEmployee = { 
                id: 1, 
                name: "Mathew",
                email: email 
            } as Employee;
            
            when(repository.findOne).calledWith({
                where: { email: email }
            }).mockReturnValue(mockEmployee);

            const result = await employeeRepository.findOneByEmail(email);

            expect(result).toEqual(mockEmployee);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { email: email }
            });
        });

        it("returns null when no employee matches the provided email", async () => {
            const email = "mathew@mathew.com";
            
            when(repository.findOne).calledWith({
                where: { email: email }
            }).mockReturnValue(null);

            const result = await employeeRepository.findOneByEmail(email);

            expect(result).toBeNull();
        });
    });

    describe('updateEmployeeDepartment', () => {
        it("reassigns an employee to a different department", async () => {
            const mockEmployee = { 
                id: 1, 
                name: "Mathew ",
                email: "mathew@kv.com",
                department: { id: 1, name: "HR" }
            } as Employee;
            
            const newDepartment = { 
                id: 2, 
                name: "Software" 
            } as Department;
            
            const updatedEmployee = { 
                ...mockEmployee, 
                department: newDepartment 
            };
            
            const updateResult = { affected: 1 };
            
            when(repository.update)
                .calledWith(mockEmployee.id, updatedEmployee)
                .mockReturnValue(updateResult);

            const result = await employeeRepository.updateEmployeeDepartment(mockEmployee, newDepartment);

            expect(result).toEqual(updateResult);
            expect(repository.update).toHaveBeenCalledWith(mockEmployee.id, updatedEmployee);
        });
    });
});