import { EntityBase } from "../config/base.entity";
import { Entity, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { PersonaEntity } from "./persona.entity";
import { ResponsableEconomicoEntity } from "./responsableEconomico.entity";
import { InscripcionEntity } from "./inscripcion.entity";
import { PuntajeEntity } from "./puntaje.entity";

@Entity({ name: "estudiante" })
export class EstudianteEntity extends EntityBase{
    
    @Column()
    edad!:string;

    @Column()
    sexo!:string;

    @OneToOne(() => PersonaEntity)
    @JoinColumn()
    persona!: PersonaEntity

    @ManyToOne(() => ResponsableEconomicoEntity, (responsableEconomico) => responsableEconomico.estudiantes)
    responsableEconomico!: ResponsableEconomicoEntity

    @OneToMany(() => InscripcionEntity, (inscripciones) => inscripciones.estudiante)
    inscripciones!: InscripcionEntity[]

    @OneToMany(() => PuntajeEntity, (puntajes) => puntajes.estudiante)
    puntajes!: PuntajeEntity[];
}