import { ServiceBase } from "../config/base.service";
import * as bcrypt from "bcrypt";
import { AdministradorDTO } from "../dto/administrador.dto";
import { AdministradorEntity } from "../models/administrador.entity";
import { CRUD } from "../shared/interfaces/crud.interface";
import { TipoEntity } from "../models/tipo.entity";

export class AdministradorService extends ServiceBase<AdministradorEntity> implements CRUD<AdministradorEntity, AdministradorDTO>{
    constructor(){
        super(AdministradorEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }
    
    async create(body: AdministradorDTO){
        const newAdmin = (await this.execRepository).create(body);

        // Ponemos el dni como contraseña
        newAdmin.contrasenia = newAdmin.dni

        // Encriptamos la contraseña
        const hast = await bcrypt.hash(newAdmin.contrasenia, 10);

        // Creamos el usuario
        const letraNombre = newAdmin.nombre.split(' ')[0].charAt(0).toLowerCase()
        const apellido = newAdmin.apellidos.split(' ')[0].toLowerCase()
        const correo = letraNombre+apellido+"_admin"+'@gmail.com'

        // verificamos si el usuario existe 
        let exist = await this.findUsuario(correo)

        if (exist) {
            return null
        }else{

            newAdmin.usuario = correo
            newAdmin.contrasenia = hast;
    
            return (await this.execRepository).save(newAdmin);
        }

    }

    async update(id:string, body:AdministradorDTO){
        const newAdmin = (await this.execRepository).create(body);
        const hast = await bcrypt.hash(newAdmin.contrasenia, 10);
        newAdmin.contrasenia = hast;
        return (await this.execRepository).update(id,newAdmin);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

    /**
     * === PETITIONS WITH QUERY BUILDER ===
     */

    async findUser(usuario : string):Promise<AdministradorEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder("administrador")
            .addSelect("administrador.contrasenia")
            .where({ usuario })
            .getOne();

    }

    async findAdminWithTipo(usuario:string):Promise<AdministradorEntity|null>{
        const Admin = (await this.execRepository)
            .createQueryBuilder("administrador")
            .leftJoinAndSelect('administrador.tipo','tipo')
            .where({usuario})
            .getOne()
        
        return Admin;
    }

    async findUsuario(usuario: string):Promise<AdministradorEntity|null>{
        const admin = (await this.execRepository)
        .createQueryBuilder("administrador")
        .addSelect("administrador.usuario")
        .where({ usuario })
        .getOne();

        return admin
    }

}