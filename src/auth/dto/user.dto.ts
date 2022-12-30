import { IsNotEmpty } from "class-validator"

export class UserDto{

    @IsNotEmpty()
    usuario!:string

    @IsNotEmpty()
    contrasenia!:string

}