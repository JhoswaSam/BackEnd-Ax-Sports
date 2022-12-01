import { Router } from "express";

export class RouterBase<T>{
    
    public router: Router;
    public controller: T;
    //public middleware: U;

    constructor(TController: {new (): T}){
        this.router = Router();
        this.controller = new TController()
        this.routers();
    }

    public routers(): void{ }

}