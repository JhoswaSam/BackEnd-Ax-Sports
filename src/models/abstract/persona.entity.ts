import { Column } from "typeorm"
import { UsuarioEntity } from "./usuario.entity";

export abstract class PersonaEntity extends UsuarioEntity{
    
    @Column()
    nombre!:string;

    @Column()
    apellidos!:string;

    @Column()
    dni!:string;

    @Column()
    telefono!:string;

    @Column({ type:"timestamp" , nullable: true })
    fechaNacimiento!:Date;

}