import express from "express";
import morgan from "morgan";
import cors from "cors";
import { HorarioRouter } from "./router/horario.route";
import { ConfigServer } from "./config/config";
import { TipoRouter } from "./router/tipo.route";
import { DistanciaRouter } from "./router/distancia.route";
import { EventoRouter } from "./router/evento.route";
import { SedeRouter } from "./router/sede.route";
import { AdministradorRouter } from "./router/administrador.route";
import { ResponsableEconomicoRouter } from "./router/responsableEconomico.route";
import { EstudianteRouter } from "./router/estudiante.route";
import { PuntajeRouter } from "./router/puntaje.route";
import { PagoRouter } from "./router/pago.route";
import { InscripcionRouter } from "./router/inscripcion.route";


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


    private routers(): Array<express.Router>{
        return [
            //Rutas de los controladores
            new HorarioRouter().router,
            new TipoRouter().router,
            new DistanciaRouter().router,
            new EventoRouter().router,
            new SedeRouter().router,
            new AdministradorRouter().router,
            new ResponsableEconomicoRouter().router,
            new EstudianteRouter().router,
            new PuntajeRouter().router,
            new PagoRouter().router,
            new InscripcionRouter().router,
        ];
    }

    //Puerto escucha
    public listen(): void{
        this.app.listen(this.port,()=>{
            console.log("Servidor escuchando en el puerto : "+this.port);
        });        
    }

}

new ServerBootstrap