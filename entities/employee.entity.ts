import { Entity, Column, ForeignKey, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";
export enum EmployeeRole{
  UI = 'UI',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER',
  HR = 'HR'
}

export enum EmployeeStatus {
  ACTIVE='ACTIVE',
  INACTIVE='INACTIVE',
  PROBATION = 'PROBATION'
}
@Entity()
class Employee extends AbstractEntity {

    @Column({unique:true})
    email: string;

    @Column()
    age:number

    @Column()
    name: string;

    @Column()
    password:string;

    @Column()
    employeeId:string;


    @Column({
      type : 'enum',
      enum:EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role:EmployeeRole;

     @Column({
      type : 'enum',
      enum:EmployeeStatus,
      default: EmployeeStatus.PROBATION
    })
    status:EmployeeStatus;
    

    @Column()
    experience:number;

    @Column()
    dateOfJoining:Date

    @OneToOne(()=>Address,(address)=>address.employee,{
      cascade:true
    })
    address : Address

    @ManyToOne(()=>Department,(department)=>department.employees)
    department:Department
  }
  
  export default Employee;
  