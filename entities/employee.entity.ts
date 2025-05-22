import { Entity, Column, ForeignKey, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import { Department } from "./department.entity";

@Entity()
class Employee extends AbstractEntity {

    @Column({unique:true})
    email: string;

    @Column()
    age:number

    @Column()
    name: string;
    

    @OneToOne(()=>Address,(address)=>address.employee,{
      cascade:true,
      onDelete:'CASCADE'
    })
    @JoinColumn()
    address : Address

    @ManyToOne(()=>Department,(department)=>department.employees,{
      cascade:true,
      onDelete:'CASCADE'
    })
    department:Department
  }
  
  export default Employee;
  