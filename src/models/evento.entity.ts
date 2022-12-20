import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany } from "typeorm"
import { AdministradorEntity } from "./administrador.entity";
import { PuntajeEntity } from "./puntaje.entity";

@Entity({ name: "evento" })
export class EventoEntity extends EntityBase{
    
    @Column()
    nombre!:string;

    @OneToMany(() => PuntajeEntity, (puntajes) => puntajes.evento)
    puntajes!: PuntajeEntity[];

}