import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-addres.dto";
import { EmployeeRole, EmployeeStatus } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password:string;

  @IsEnum(EmployeeRole)
  role:EmployeeRole;

  @IsEnum(EmployeeStatus)
  status:EmployeeStatus;

  @IsDateString()
  dateOfJoining:Date

  @IsNumber()
  experience:number

  @IsString()
  employeeId:string

  @ValidateNested()
  @Type(()=>CreateAddressDto)
  address:CreateAddressDto

  @IsNumber()
  department_id:number
}