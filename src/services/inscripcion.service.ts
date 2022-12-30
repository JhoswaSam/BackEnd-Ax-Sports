import { ServiceBase } from "../config/base.service";
import { InscripcionDTO } from "../dto/inscripcion.dto";
import { InscripcionEntity } from "../models/inscripcion.entity";
import { CRUD } from "../shared/interfaces/crud.interface";

export class InscripcionService extends ServiceBase<InscripcionEntity> implements CRUD<InscripcionEntity, InscripcionDTO>{
    constructor(){
        super(InscripcionEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: InscripcionDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:InscripcionDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}