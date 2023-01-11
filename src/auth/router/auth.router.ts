import { AuthAdminController } from "../controllers/auth.controller";
import { RouterBase } from "../../config/router";
import { LoginValidatorMiddleware } from "../middleware/LoginValidator.middleware";

export class AuthAdminRouter extends RouterBase<AuthAdminController,LoginValidatorMiddleware>{
    constructor(){
        super(AuthAdminController, LoginValidatorMiddleware)
    }

    routers():void{
        this.router.post("/login",(req,res,next) =>
            [this.middleware.validateAdmin(req,res,next)],(req, res) =>
            this.controller.postLogin(req, res)
        );

        this.router.get("/logout",(req, res) =>
            this.controller.postLogout(req, res)
        );

        this.router.get("/profile",(req, res) =>
            this.controller.profile(req, res)
        );

        this.router.post("/updateProfile",(req, res) =>
            this.controller.updateProfile(req, res)
        );

        

    }
}