import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class UpdateAddressDto {

  @IsString()
  line1: string;

  @IsNumber()
  pincode: number;

  @IsString()
  line2:string
  

  @IsNumber()
  houseNo:number;


}