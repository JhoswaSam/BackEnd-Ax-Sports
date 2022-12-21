import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class PagoDTO extends DTOBase{

    @IsNotEmpty()
    mes!:string;

    @IsNotEmpty()
    pagoTotal!:number;

}