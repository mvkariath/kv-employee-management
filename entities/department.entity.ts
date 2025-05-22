import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";
@Entity()
export class Department extends AbstractEntity{

    @Column()
    name : string;

    @OneToMany(()=>Employee,(employee)=>employee.department)
    employees:Employee[]



}