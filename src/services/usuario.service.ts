import { ServiceBase } from "../config/base.service";
import { UsuarioDTO } from "../dto/usuario.dto";
import { UsuarioEntity } from "../models/usuario.entity";
import { CRUD } from "./interface/crud.interface";

export class UsuarioService extends ServiceBase<UsuarioEntity> implements CRUD<UsuarioEntity, UsuarioDTO>{
    constructor(){
        super(UsuarioEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: UsuarioDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:UsuarioDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}