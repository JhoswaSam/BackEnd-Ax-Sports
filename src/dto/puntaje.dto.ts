import { IsNotEmpty } from "class-validator";
import { DTOBase } from "../config/base.dto";
import { EstudianteEntity } from "../models/estudiante.entity";
import { DistanciaEntity } from "../models/distancia.entity";
import { EventoEntity } from "../models/evento.entity";

export class PuntajeDTO extends DTOBase{

    @IsNotEmpty()
    fecha!:Date;

    @IsNotEmpty()
    distancia!:DistanciaEntity;

    @IsNotEmpty()
    evento!:EventoEntity;

    @IsNotEmpty()
    estudiante!:EstudianteEntity;

}