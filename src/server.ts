import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HorarioRouter } from "./router/horario.route";
import { ConfigServer } from "./config/config";
import { Connection, createConnection } from "typeorm";


/**
 * 
 */
class ServerBootstrap extends ConfigServer{
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT');

    /**
     * Contructor de las dependencias para el servidor y iniciamos el servidor
     */
    constructor(){
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended : true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.bdConnection();

        this.app.use('/api',this.routers())
        this.listen();
    }

    async bdConnection(): Promise<Connection> {
        return await createConnection(this.typeORMConfig);
    }

    private routers(): Array<express.Router>{
        return [//Rutas de los controladores
            new HorarioRouter().router,
        ];
    }

    public listen(): void{
        this.app.listen(this.port,()=>{
            console.log("Servidor escuchando en el puerto : "+this.port);
        });        
    }

}

new ServerBootstrap