import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany } from "typeorm"
import { AdministradorEntity } from "./administrador.entity";

@Entity({ name: "tipo" })
export class TipoEntity extends EntityBase{
    
    @Column()
    nombre!:string;

    @OneToMany(() => AdministradorEntity, (administradores) => administradores.tipo)
    administradores!: AdministradorEntity[];

}