import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany, ManyToOne } from "typeorm"
import { InscripcionEntity } from "./inscripcion.entity";
import { SedeEntity } from "./sede.entity";

@Entity({ name: "horario" })
export class HorarioEntity extends EntityBase{
    
    @Column()
    dias!:string;
    
    @Column()
    monto!:number;
    
    @Column()
    categoria!:string;

    @OneToMany(() => InscripcionEntity, (inscripciones) => inscripciones.horario)
    inscripciones!: InscripcionEntity[]

    @ManyToOne(() => SedeEntity, (sede) => sede.horarios)
    sede!: SedeEntity
}