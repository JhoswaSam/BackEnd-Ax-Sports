import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany } from "typeorm"
import { PuntajeEntity } from "./puntaje.entity";

@Entity({ name: "distancia" })
export class DistanciaEntity extends EntityBase{
    
    @Column()
    nombre!:string;

    @OneToMany(() => PuntajeEntity, (puntajes) => puntajes.distancia)
    puntajes!: PuntajeEntity[];

}