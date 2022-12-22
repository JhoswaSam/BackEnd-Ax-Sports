import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany } from "typeorm"
import { PersonaEntity } from "./abstract/persona.entity";
import { HorarioEntity } from "./horario.entity";
import { AdministradorEntity } from "./administrador.entity";
import { EstudianteEntity } from "./estudiante.entity";

@Entity({ name: "sede" })
export class SedeEntity extends EntityBase{
    
    @Column()
    nombre!:string;

    @Column()
    direccion!:string; 

    @OneToMany(() => HorarioEntity, (horarios) => horarios.sede)
    horarios!: HorarioEntity[]

    @OneToMany(() => AdministradorEntity, (administradores) => administradores.sede)
    administradores!: AdministradorEntity[]

    @OneToMany(() => EstudianteEntity, (estudiantes) => estudiantes.sede)
    estudiantes!: AdministradorEntity[]
}