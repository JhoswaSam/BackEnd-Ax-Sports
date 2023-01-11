import { LoginValidatorMiddleware } from "../../auth/middleware/LoginValidator.middleware";
import { RouterBase } from "../../config/router";
import { ExtentionsController } from "../controllers/userExtentions.controller";

export class ExtentionsRouter extends RouterBase<ExtentionsController,LoginValidatorMiddleware>{
    constructor(){
        super(ExtentionsController,LoginValidatorMiddleware);
    }

    routers():void{
        this.router.get("/myPayments",(req, res) =>
            this.controller.Payments(req, res)
        );


        this.router.get("/myChildren",(req, res) =>
            this.controller.Children(req, res)
        );

        this.router.get("/mySchedule",(req, res) =>
            this.controller.Schedule(req, res)
        );
    }


}