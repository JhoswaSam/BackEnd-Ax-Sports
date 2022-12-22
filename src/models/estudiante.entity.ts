import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { PersonaEntity } from "./abstract/persona.entity";
import { ResponsableEconomicoEntity } from "./responsableEconomico.entity";
import { InscripcionEntity } from "./inscripcion.entity";
import { PuntajeEntity } from "./puntaje.entity";
import { SedeEntity } from "./sede.entity";
import { PagoEntity } from "./pago.entity";

@Entity({ name: "estudiante" })
export class EstudianteEntity extends PersonaEntity{

    @Column()
    sexo!:string;
 
    @ManyToOne(() => ResponsableEconomicoEntity, (responsableEconomico) => responsableEconomico.estudiantes)
    responsableEconomico!: ResponsableEconomicoEntity

    @ManyToOne(() => SedeEntity, (sede) => sede.estudiantes)
    sede!: SedeEntity

    @OneToMany(() => InscripcionEntity, (inscripciones) => inscripciones.estudiante)
    inscripciones!: InscripcionEntity[]

    @OneToMany(() => PuntajeEntity, (puntajes) => puntajes.estudiante)
    puntajes!: PuntajeEntity[];

    @OneToMany(() => PagoEntity, (pagos) => pagos.estudiante)
    pagos!: PagoEntity[]
    
}