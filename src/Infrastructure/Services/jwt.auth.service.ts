import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDTO } from "src/Application/DTO/User/User.dto";

export class JwtAuthService extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    console.log(req.cookies)
                    console.log(req.signedCookies)
                    return req.signedCookies.jwt
                }
            ]),
            ignoreExpiration: true,
            secretOrKey: "secret"
        })
    }

    async validate(payload: UserDTO) {

        return payload
    }
}