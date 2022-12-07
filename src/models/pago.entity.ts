import { EntityBase } from "../config/base.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm"
import { ResponsableEconomicoEntity } from "./responsableEconomico.entity";
import { InscripcionEntity } from "./inscripcion.entity";

@Entity({ name: "pago" })
export class PagoEntity extends EntityBase{
    
    @Column()
    mes!:string;

    @Column()
    pagoTotal!:number;

    @ManyToOne(() => ResponsableEconomicoEntity, (responsableEconomico) => responsableEconomico.pagos)
    responsableEconomico!: ResponsableEconomicoEntity

    @OneToMany(() => InscripcionEntity, (inscripciones) => inscripciones.pago)
    inscripciones!: InscripcionEntity[]
}