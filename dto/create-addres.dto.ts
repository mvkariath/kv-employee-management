import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateAddressDto {

  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsString()
  line2:string
  

  @IsNumber()
  houseNo:number;
  

  @IsNotEmpty()
  @IsNumber()
  pincode: number;


}