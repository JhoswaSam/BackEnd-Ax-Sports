import { ServiceBase } from "../config/base.service";
import { AdministradorDTO } from "../dto/administrador.dto";
import { AdministradorEntity } from "../models/administrador.entity";
import { CRUD } from "./interface/crud.interface";

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
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:AdministradorDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}