import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { EntityBase } from "./base.entity";
import { ConfigServer } from "./config";

export class ServiceBase<T extends EntityBase> extends ConfigServer{
    
    public execRepository: Promise<Repository<T>>

    constructor(private getEntity:EntityTarget<T>){
        super();
        this.execRepository= this.initRepository(this.getEntity);
    }

    async initRepository<T extends EntityBase>(e: EntityTarget<T>): Promise<Repository<T>>{
        const getConn = await this.initConnection;
        return getConn.getRepository(e);
    }
}