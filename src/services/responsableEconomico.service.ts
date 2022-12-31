import { ServiceBase } from "../config/base.service";
import { ResponsableEconomicoDTO } from "../dto/responsableEconomico.dto";
import { ResponsableEconomicoEntity } from "../models/responsableEconomico.entity";
import { CRUD } from "../shared/interfaces/crud.interface";
import * as bcrypt from "bcrypt";

export class ResponsableEconomicoService extends ServiceBase<ResponsableEconomicoEntity> implements CRUD<ResponsableEconomicoEntity, ResponsableEconomicoDTO>{
    constructor(){
        super(ResponsableEconomicoEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: ResponsableEconomicoDTO){
        const newRespon = (await this.execRepository).create(body);

        // Ponemos el dni como contraseña
        newRespon.contrasenia = "123" //contraseña por defecto para los responables economicos

        // Encriptamos la contraseña
        const hast = await bcrypt.hash(newRespon.contrasenia, 10);

        // Creamos el usuario
        const letraNombre = newRespon.nombre.split(' ')[0].charAt(0).toLowerCase()
        const apellido = newRespon.apellidos.split(' ')[0].toLowerCase()
        const correo = letraNombre+apellido+"_r"+'@gmail.com'

        // verificamos si el usuario existe 
        let exist = await this.findUsuario(correo)

        if (exist) {
            return null
        }else{

            newRespon.usuario = correo
            newRespon.contrasenia = hast;
    
            return (await this.execRepository).save(newRespon);
        }
    }

    async update(id:string, body:ResponsableEconomicoDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

    /**
     *      
     */

    async findUser(usuario : string):Promise<ResponsableEconomicoEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("responsableEconomico")
            .addSelect("responsableEconomico.contrasenia")
            .where({ usuario })
            .getOne();

    }

    async findUsuario(usuario: string):Promise<ResponsableEconomicoEntity|null>{
        return (await this.execRepository)
        .createQueryBuilder("responsableEconomico")
        .addSelect("responsableEconomico.usuario")
        .where({ usuario })
        .getOne();
    }

}