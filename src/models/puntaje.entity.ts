import { EntityBase } from "../config/base.entity";
import { Entity, Column, ManyToOne } from "typeorm"
import { DistanciaEntity } from "./distancia.entity";
import { EventoEntity } from "./evento.entity";
import { EstudianteEntity } from "./estudiante.entity";

@Entity({ name: "puntaje" })
export class PuntajeEntity extends EntityBase{
    
    @Column({ type:"timestamp" , nullable: true })
    fecha!:Date;

    @ManyToOne(() => DistanciaEntity, (distancia) => distancia.puntajes)
    distancia!: DistanciaEntity

    @ManyToOne(() => EventoEntity, (evento) => evento.puntajes)
    evento!: EventoEntity

    @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.puntajes)
    estudiante!: EstudianteEntity
    
}