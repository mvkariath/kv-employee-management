import { AuthService } from "../services/auth.services";
import{Request,Response} from 'express'
export class AuthController{
    constructor(private authService:AuthService, router ){
        router.post('/',this.verifyUser.bind(this));
    }
    async verifyUser(req:Request,res:Response,next){
        try{
        const {email,password} = req.body
        const employee = await this.authService.loginUser(email,password);
        res.status(200).send(employee)}
        catch(err){
            next(err)
        }

    }
}