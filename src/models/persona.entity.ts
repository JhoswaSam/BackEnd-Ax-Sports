import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { UsuarioEntity } from "./usuario.entity";
import { SedeEntity } from "./sede.entity";

@Entity({ name: "persona" })
export class PersonaEntity extends EntityBase{
    
    @Column()
    nombre!:string;

    @Column()
    apellidos!:string;

    @Column()
    dni!:string;

    @Column()
    telefono!:string;

    @OneToOne(() => UsuarioEntity)
    @JoinColumn()
    usuario!: UsuarioEntity

    @ManyToOne(() => SedeEntity, (sede) => sede.personas)
    sede!: SedeEntity
}