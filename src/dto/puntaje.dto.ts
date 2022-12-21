import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class PuntajeDTO extends DTOBase{

    @IsNotEmpty()
    fecha!:Date;

}