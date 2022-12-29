import { EntityBase } from "../../config/base.entity";
import { Column } from "typeorm"

export abstract class UsuarioEntity extends EntityBase{
    
    @Column()
    usuario!:string;

    @Column({select: false})
    contrasenia!:string;

}