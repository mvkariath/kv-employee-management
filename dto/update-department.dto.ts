import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class UpdateDepartmentDTO {

  @IsString()
  name: string;


}