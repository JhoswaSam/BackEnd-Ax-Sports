import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany } from "typeorm"
import { PersonaEntity } from "./persona.entity";
import { HorarioEntity } from "./horario.entity";

@Entity({ name: "sede" })
export class SedeEntity extends EntityBase{
    
    @Column()
    nombre!:string;

    @Column()
    direccion!:string; 

    @OneToMany(() => PersonaEntity, (personas) => personas.sede)
    personas!: PersonaEntity[];

    @OneToMany(() => HorarioEntity, (horarios) => horarios.sede)
    horarios!: HorarioEntity[]
}