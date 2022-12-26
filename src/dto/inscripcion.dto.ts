import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { HorarioEntity } from "../models/horario.entity";
import { EstudianteEntity } from "../models/estudiante.entity";
import { PagoEntity } from "../models/pago.entity";

export class InscripcionDTO extends DTOBase{

    @IsNotEmpty()
    pago!:PagoEntity;

    @IsNotEmpty()
    estudiante!:EstudianteEntity;

    @IsNotEmpty()
    horario!:HorarioEntity;

}