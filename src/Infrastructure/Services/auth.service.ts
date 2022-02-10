import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { BasicStrategy } from "passport-http";
import { UserApplicationService } from "src/Application/ApplicationServices/UserApplicationService.service";
import { LoginUserDTO } from "src/Application/DTO/User/LoginUser.dto";

@Injectable()
export class AuthService extends PassportStrategy(BasicStrategy) {
    constructor(@Inject("UserService") public service: UserApplicationService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const userDto = await this.service.handle(new LoginUserDTO(username, password))
        if (!userDto) throw new UnauthorizedException()

        return userDto
    }
}