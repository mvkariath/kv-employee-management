import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateAddressDto } from "./create-addres.dto";

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


  @ValidateNested()
  @Type(()=>CreateAddressDto)
  address:CreateAddressDto

}