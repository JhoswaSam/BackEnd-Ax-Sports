import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToOne, JoinColumn, OneToMany } from "typeorm"
import { UsuarioEntity } from "./abstract/usuario.entity";
import { EstudianteEntity } from "./estudiante.entity";
import { PagoEntity } from "./pago.entity";

@Entity({ name: "responsableEconomico" })
export class ResponsableEconomicoEntity extends UsuarioEntity{
    
    @Column()
    nombre!:string;

    @Column()
    apellidos!:string;

    @OneToMany(() => EstudianteEntity, (estudiantes) => estudiantes.responsableEconomico)
    estudiantes!: EstudianteEntity[]

    @OneToMany(() => PagoEntity, (pagos) => pagos.responsableEconomico)
    pagos!: PagoEntity[]
}