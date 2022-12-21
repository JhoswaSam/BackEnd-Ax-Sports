import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class DistanciaDTO extends DTOBase{

    @IsNotEmpty()
    nombre!:string;

}