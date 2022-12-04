import { EntityBase } from "../config/base.entity";
import { Entity, Column } from "typeorm"

@Entity({ name: "usuario" })
export class UsuarioEntity extends EntityBase{
    
    @Column()
    usuario!:string;

    @Column()
    contrasenia!:string;

    
}