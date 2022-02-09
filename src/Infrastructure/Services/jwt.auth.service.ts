import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDTO } from "src/Application/DTO/User/User.dto";

export class JwtAuthService extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req.signedCookies.jwt
            ]),
            ignoreExpiration: true,
            secretOrKey: "secret"
        })
    }

    async validate(payload: UserDTO) {
        return payload
    }
}