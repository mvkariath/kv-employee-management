import { JWTPayload } from "../dto/jwt-payload";

declare global {
    namespace Express{
        interface Request{
            user?:JWTPayload
        }
    }
}

