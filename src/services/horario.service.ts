import { ServiceBase } from "../config/base.service";
import { HorarioDTO } from "../dto/horario.dto";
import { AdministradorEntity } from "../models/administrador.entity";
import { HorarioEntity } from "../models/horario.entity";
import { CRUD } from "../shared/interfaces/crud.interface";

export class HorarioService extends ServiceBase<HorarioEntity> implements CRUD<HorarioEntity, HorarioDTO>{
    constructor(){
        super(HorarioEntity);
    }

    // CRUD BASICO

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: HorarioDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:HorarioDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }


    // FUNCIONES EXTRA

    async misProfesores(id: string):Promise<HorarioEntity|null>{
        return (await this.execRepository)
            .createQueryBuilder("horario")
            .leftJoinAndSelect('horario.administradores','administrador')
            .where({ id })
            .getOne();
    }

    async agregarProfesor(profesor:string, horario:string):Promise<any>{
        return (await this.execRepository)
            .createQueryBuilder("horario")
            .relation(HorarioEntity, "administradores")
            .of(horario)
            .add(profesor)
    }

    async eliminaProfesor(profesor:string, horario:string):Promise<any>{
        return (await this.execRepository)
            .createQueryBuilder("horario")
            .relation(HorarioEntity, "administradores")
            .of(horario)
            .remove(profesor)
    }
}