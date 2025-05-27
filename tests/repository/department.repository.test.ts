import DepartmentRepository from "../../repositories/department.repository";
import { Repository } from "typeorm";
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import Department from "../../entities/department.entity";

describe('DepartmentRepo', () => {
    let repository: MockProxy<Repository<Department>>;
    let departmentRepository: DepartmentRepository;

    beforeEach(() => {
        repository = mock<Repository<Department>>();
        departmentRepository = new DepartmentRepository(repository);
    });

    describe('create', () => {
        it("creates a new department", async () => {
            const mockDepartment = { id: 1, name: "HR" } as Department;
            when(repository.save).calledWith(mockDepartment).mockReturnValue(mockDepartment);

            const result = await departmentRepository.create(mockDepartment);

            expect(result).toEqual(mockDepartment);
            expect(repository.save).toHaveBeenCalledWith(mockDepartment);
        });
    });

    describe('findMany', () => {
        it("get all available departments", async () => {
            const mockDepartments = [
                { id: 1, name: "HR" } as Department,
                { id: 2, name: "DEV" } as Department
            ];
            when(repository.find).calledWith().mockReturnValue(mockDepartments);

            const result = await departmentRepository.findMany();

            expect(result).toEqual(mockDepartments);
            expect(repository.find).toHaveBeenCalled();
        });
    });

    describe('findOneByID', () => {
        it("fetches a department by ID", async () => {
            const id = 1;
            const mockDepartment = { id: id, name: "HR" } as Department;
            when(repository.findOne).calledWith({
                where: { id: id }
            }).mockReturnValue(mockDepartment);

            const result = await departmentRepository.findOneByID(id);

            expect(result).toEqual(mockDepartment);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: id }
            });
        });

        it("returns null when no dept is found", async () => {
            const id = 999;
            when(repository.findOne).calledWith({
                where: { id: id }
            }).mockReturnValue(null);

            const result = await departmentRepository.findOneByID(id);

            expect(result).toBeNull();
        });
    });

    describe('findEmployeeInDepartment', () => {
        it("gets all employees in a department", async () => {
            const id = 1;
            const mockDepartment = { 
                id: id, 
                name: "HR",
                employees: [
                    { id: 1, name: "Employee 1" },
                    { id: 2, name: "Employee 2" }
                ]
            } as Department;
            
            when(repository.findOne).calledWith({
                where: { id: id },
                relations: { employees: true }
            }).mockReturnValue(mockDepartment);

            const result = await departmentRepository.findEmployeeInDepartment(id);

            expect(result).toEqual(mockDepartment);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { id: id },
                relations: { employees: true }
            });
        });
    });

    describe('update', () => {
        it("change the deparqtment name", async () => {
            const id = 1;
            const name = "DEV";
            
            when(repository.save).calledWith({id: id, name: name}).mockResolvedValue(undefined);

            await departmentRepository.update(id, name);

            expect(repository.save).toHaveBeenCalledWith({id: id, name: name});
        });
    });

    describe('delete', () => {
        it("performs a soft deletion on a department", async () => {
            const id = 1;
            
            when(repository.softDelete).calledWith(id).mockResolvedValue(undefined);

            await departmentRepository.delete(id);

            expect(repository.softDelete).toHaveBeenCalledWith(id);
        });
    });

    describe('remove', () => {
        it("completely removes a department entity from the database", async () => {
            const mockDepartment = { id: 1, name: "HR" } as Department;
            when(repository.remove).calledWith(mockDepartment).mockReturnValue(mockDepartment);

            const result = await departmentRepository.remove(mockDepartment);

            expect(result).toEqual(mockDepartment);
            expect(repository.remove).toHaveBeenCalledWith(mockDepartment);
        });
    });
});