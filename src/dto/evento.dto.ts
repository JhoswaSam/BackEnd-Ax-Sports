import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class EventoDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

}