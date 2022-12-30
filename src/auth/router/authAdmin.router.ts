import { AuthAdminController } from "../controllers/authAdmin.controller";
import { RouterBase } from "../../config/router";
import { LoginValidatorMiddleware } from "../middleware/LoginValidator.middleware";

export class AuthAdminRouter extends RouterBase<AuthAdminController,LoginValidatorMiddleware>{
    constructor(){
        super(AuthAdminController, LoginValidatorMiddleware)
    }

    routers():void{
        this.router.post("/login",(req,res,next)=>[this.middleware.validateAdmin(req,res,next)],(req, res) =>
            this.controller.postLogin(req, res)
        );

        this.router.post("/logout",(req, res) =>
            this.controller.postLogout(req, res)
        );
        
    }
}