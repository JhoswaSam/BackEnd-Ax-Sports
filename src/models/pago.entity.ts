import { EntityBase } from "../config/base.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import { ResponsableEconomicoEntity } from "./responsableEconomico.entity";
import { InscripcionEntity } from "./inscripcion.entity";
import { EstudianteEntity } from "./estudiante.entity";

@Entity({ name: "pago" })
export class PagoEntity extends EntityBase{
    
    @Column()
    mes!:string;

    @Column()
    pagoTotal!:number;

    @Column()
    medio!:string;

    @Column()
    comprobante!:string;

    @ManyToOne(() => ResponsableEconomicoEntity, (responsableEconomico) => responsableEconomico.pagos)
    responsableEconomico!: ResponsableEconomicoEntity

    @ManyToOne(() => EstudianteEntity, (estudiante) => estudiante.pagos)
    estudiante!: EstudianteEntity

    @OneToMany(() => InscripcionEntity, (inscripciones) => inscripciones.pago)
    inscripciones!: InscripcionEntity[]
    
}