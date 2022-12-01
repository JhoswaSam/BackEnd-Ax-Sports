import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HorarioRouter } from "./router/horario.route";


/**
 * 
 */
class ServerBootstrap{
    public app: express.Application = express();
    private port: number = 8000;

    /**
     * Contructor de las dependencias para el servidor y iniciamos el servidor
     */
    constructor(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended : true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());

        this.app.use('/api',this.routers())
        this.listen();
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