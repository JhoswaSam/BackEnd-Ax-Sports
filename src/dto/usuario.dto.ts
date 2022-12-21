import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class UsuarioDTO extends DTOBase{

    @IsNotEmpty()
    usuario!:string;

    @IsNotEmpty()
    constrasenia!:string;

}