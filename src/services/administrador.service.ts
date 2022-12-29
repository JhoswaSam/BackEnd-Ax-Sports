import { ServiceBase } from "../config/base.service";
import * as bcrypt from "bcrypt";
import { AdministradorDTO } from "../dto/administrador.dto";
import { AdministradorEntity } from "../models/administrador.entity";
import { CRUD } from "../app/interfaces/crud.interface";
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
        const hast = await bcrypt.hash(newAdmin.contrasenia, 10);
        newAdmin.contrasenia = hast;
        return (await this.execRepository).save(newAdmin);
    }

    async update(id:string, body:AdministradorDTO){
        return (await this.execRepository).update(id,body);
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

}