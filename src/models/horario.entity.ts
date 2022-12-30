import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { InscripcionEntity } from "./inscripcion.entity";
import { SedeEntity } from "./sede.entity";
import { AdministradorEntity } from "./administrador.entity";

@Entity({ name: "horario" })
export class HorarioEntity extends EntityBase{
    
    @Column()
    dias!:string;
    
    @Column()
    monto!:number;
    
    @Column()
    categoria!:string;

    @Column()
    hora!:string;

    @Column()
    horaFin!:string;

    @OneToMany(() => InscripcionEntity, (inscripciones) => inscripciones.horario)
    inscripciones!: InscripcionEntity[]

    @ManyToOne(() => SedeEntity, (sede) => sede.horarios)
    sede!: SedeEntity

    @ManyToMany(()=>AdministradorEntity,(administradores)=>administradores.horarios)
    @JoinTable()
    administradores?:AdministradorEntity[]
    
}