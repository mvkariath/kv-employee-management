import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
@Entity()
export default class Department extends AbstractEntity{

    @Column({
        unique:true  // this it to make sure that no two dept with same name exist
    })
    name : string;

    @OneToMany(()=>Employee,(employee)=>employee.department,{
        cascade:true,
        onDelete:'CASCADE'
    })
    
    employees:Employee[]
    
}