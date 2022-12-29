import { ServiceBase } from "../config/base.service";
import { EventoDTO } from "../dto/evento.dto";
import { EventoEntity } from "../models/evento.entity";
import { CRUD } from "../app/interfaces/crud.interface";

export class EventoService extends ServiceBase<EventoEntity> implements CRUD<EventoEntity, EventoDTO>{
    constructor(){
        super(EventoEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: EventoDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:EventoDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

}