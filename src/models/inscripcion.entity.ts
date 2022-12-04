import { EntityBase } from "../config/base.entity";
import { Entity, Column, ManyToOne } from "typeorm"
import { PagoEntity } from "./pago.entity";
import { EstudianteEntity } from "./estudiante.entity";
import { HorarioEntity } from "./horario.entity";

@Entity({ name: "inscripcion" })
export class InscripcionEntity extends EntityBase{
    
    @ManyToOne(() => PagoEntity, (pago) => pago.inscripciones)
    pago!: PagoEntity

    @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.inscripciones)
    estudiante!: EstudianteEntity

    @ManyToOne(() => HorarioEntity, (horario) => horario.inscripciones)
    horario!: HorarioEntity
}