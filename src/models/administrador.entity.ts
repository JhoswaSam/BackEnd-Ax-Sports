import { EntityBase } from "../config/base.entity";
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { TipoEntity } from "./tipo.entity";
import { PersonaEntity } from "./persona.entity";

@Entity({ name: "administrador" })
export class AdministradorEntity extends EntityBase{
    
    @ManyToOne(() => TipoEntity, (tipo) => tipo.administradores)
    tipo!: TipoEntity

    @OneToOne(() => PersonaEntity)
    @JoinColumn()
    persona!: PersonaEntity
}