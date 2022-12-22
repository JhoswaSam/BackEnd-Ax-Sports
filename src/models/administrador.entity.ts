import { EntityBase } from "../config/base.entity";
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { TipoEntity } from "./tipo.entity";
import { PersonaEntity } from "./abstract/persona.entity";
import { SedeEntity } from "./sede.entity";

@Entity({ name: "administrador" })
export class AdministradorEntity extends PersonaEntity{
    
    @ManyToOne(() => TipoEntity, (tipo) => tipo.administradores)
    tipo!: TipoEntity

    @ManyToOne(() => SedeEntity, (sede) => sede.administradores)
    sede!: SedeEntity
}