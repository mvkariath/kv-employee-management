import { DepartmentService } from '../../services/department.services';
import { when } from 'jest-when';
import { MockProxy, mock } from 'jest-mock-extended';
import DepartmentRepository from '../../repositories/department.repository';
import Department from '../../entities/department.entity';
import HttpException from '../../exception/httpException';
import Employee from '../../entities/employee.entity';

describe('DepartmentService', () => {
    let departmentRepository: MockProxy<DepartmentRepository>;
    let departmentService: DepartmentService;

    beforeEach(() => {
        departmentRepository = mock<DepartmentRepository>();
        departmentService = new DepartmentService(departmentRepository);
    });

    // test for creating a department
    describe('createDepartment', () => {
        it('creates department ', async () => {
            const departmentName = 'Engineering';
            const mockDepartment = new Department();
            mockDepartment.id = 1;
            mockDepartment.name = departmentName;

            when(departmentRepository.create).calledWith(expect.anything()).mockReturnValue(mockDepartment);

            const result = await departmentService.createDepartment(departmentName);

            expect(result).toEqual(mockDepartment);
            expect(departmentRepository.create).toHaveBeenCalled();
        });
    });

    // test for getting all the departments
    describe('getAllDepartments', () => {
        it('get all departments', async () => {
            const mockDepartments: Department[] = [];
            for (let i = 0; i < 3; i++) {
                const dept = new Department();
                dept.id = i + 1;
                dept.name = `Department ${i + 1}`;
                mockDepartments.push(dept);
            }

            when(departmentRepository.findMany).calledWith().mockReturnValue(mockDepartments);

            const result = await departmentService.getAllDepartments();

            expect(result).toEqual(mockDepartments);
            expect(result.length).toBe(3);
        });
    });

    // test for getting employees in a department
    // describe('getEmployeesInDepartment', () => {
    //     it('returns employees in a department', async () => {
    //         const deptId = 1;
    //         const mockDepartment = new Department();
    //         mockDepartment.id = deptId;
    //         mockDepartment.name = 'HR';
            
    //         const mockEmployees: Employee[] = [];
    //         for (let i = 0; i < 2; i++) {
    //             const emp = new Employee();
    //             emp.id = i + 1;
    //             emp.name = `Employee ${i + 1}`;
    //             mockEmployees.push(emp);
    //         }
    //         mockDepartment.employees = mockEmployees;

    //         when(departmentRepository.findEmployeeInDepartment).calledWith(deptId).mockReturnValue(mockDepartment);

    //         const result = await departmentService.getEmployeesInDepartment(deptId);

    //         expect(result).toEqual(mockDepartment);
    //         expect(result?.employees.length).toBe(2);
    //     });
    // });

    // test for getting department by ID
    describe('getDepartmentById', () => {
        it('returns department when id is there in the db', async () => {
            const deptId = 1;
            const mockDepartment = new Department();
            mockDepartment.id = deptId;
            mockDepartment.name = 'Finance';

            when(departmentRepository.findOneByID).calledWith(deptId).mockReturnValue(mockDepartment);

            const result = await departmentService.getDepartmentById(deptId);

            expect(result).toEqual(mockDepartment);
        });

        it('throws error when department is not found', async () => {
            const deptId = 999;

            when(departmentRepository.findOneByID).calledWith(deptId).mockReturnValue(null);

            const result = departmentService.getDepartmentById(deptId);

            expect(result).rejects.toThrow(HttpException);
            expect(result).rejects.toThrow('Not Found');
        });
    });

    // test for updating department by ID
    describe('updateDepartmentById', () => {
        it('updates department ', async () => {
            const deptId = 1;
            const newName = 'Old';
            const mockDepartment = new Department();
            mockDepartment.id = deptId;
            mockDepartment.name = 'New';

            when(departmentRepository.findOneByID).calledWith(deptId).mockReturnValue(mockDepartment);

            await departmentService.updateDepartmentById(deptId, newName);

            expect(departmentRepository.update).toHaveBeenCalledWith(deptId, newName);
        });

        it('does nothing when department is not there', async () => {
            const deptId = 999;
            const newName = 'Updated';

            when(departmentRepository.findOneByID).calledWith(deptId).mockReturnValue(null);

            await departmentService.updateDepartmentById(deptId, newName);

            expect(departmentRepository.update).not.toHaveBeenCalled();
        });
    });

    // hard delete
    describe('deleteDepartmentById', () => {
        it('deletes department ', async () => {
            const deptId = 1;

            await departmentService.deleteDepartmentById(deptId);

            expect(departmentRepository.delete).toHaveBeenCalledWith(deptId);
        });
    });

    // soft remove
    describe('removeDepartmentById', () => {
        it('removes department successfully', async () => {
            const mockDepartment = new Department();
            mockDepartment.id = 1;
            mockDepartment.name = 'Remove';

            await departmentService.removeDepartmentById(mockDepartment);

            expect(departmentRepository.remove).toHaveBeenCalledWith(mockDepartment);
        });
    });
});