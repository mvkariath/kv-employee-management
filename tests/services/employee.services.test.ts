import { EmployeeService } from '../../services/employee.services';
import {when} from 'jest-when'
import { MockProxy,mock } from 'jest-mock-extended';
import { ExpoLegacyDriver } from 'typeorm/driver/expo/legacy/ExpoLegacyDriver.js';
import EmployeeRepository from '../../repositories/employee.repository';
import Employee from '../../entities/employee.entity';
import HttpException from '../../exception/httpException';

describe('EmployeeService', () => {
    let employeeRepository : MockProxy<EmployeeRepository>;
    let employeeService : EmployeeService;

    beforeEach(()=>{
        employeeRepository = mock<EmployeeRepository>();
        employeeService =new EmployeeService(employeeRepository);

    })

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


})
