import { EntityBase } from "../../config/base.entity";
import { Column } from "typeorm"

export abstract class UsuarioEntity extends EntityBase{
    
    @Column({ unique: true })
    usuario!:string;

    @Column({select: false})
    contrasenia!:string;

}