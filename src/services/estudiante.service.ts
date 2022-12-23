import { ServiceBase } from "../config/base.service";
import { EstudianteDTO } from "../dto/estudiante.dto";
import { EstudianteEntity } from "../models/estudiante.entity";
import { CRUD } from "./interface/crud.interface";

export class EstudianteService extends ServiceBase<EstudianteEntity> implements CRUD<EstudianteEntity, EstudianteDTO>{
    constructor(){
        super(EstudianteEntity);
    }

    async findAll(){
        return (await this.execRepository).find();
    }

    async findbyid(id: string){
        return (await this.execRepository).findOne({where: { id } });
    }

    async create(body: EstudianteDTO){
        return (await this.execRepository).save(body);
    }

    async update(id:string, body:EstudianteDTO){
        return (await this.execRepository).update(id,body);
    }

    async delete(id:string){
        return (await this.execRepository).delete({id});
    }

    /**
     * === PETITIONS WITH RELATION ===
     */

    async findEstudianteWithSede(id: string):Promise<EstudianteEntity | null>{
        return (await this.execRepository)
            .createQueryBuilder('estudiante')
            .leftJoinAndSelect('estudiante.sede','sede')
            .where({ id })
            .getOne();
    }

}