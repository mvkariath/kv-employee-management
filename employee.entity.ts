import { Column , CreateDateColumn,Entity,PrimaryGeneratedColumn,UpdateDateColumn} from "typeorm";
@Entity()
class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
  }
  
  export default Employee;
  