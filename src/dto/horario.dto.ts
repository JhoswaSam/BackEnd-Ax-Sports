import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";

export class HorarioDTO extends DTOBase{

    @IsNotEmpty()
    dias!:string;
    
    @IsNotEmpty()
    monto!:number;
    
    @IsNotEmpty()
    categoria!:string;
}