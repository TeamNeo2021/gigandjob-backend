import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { UserDTO } from "src/Application/DTO/User/User.dto";
import { AuthedUser } from "src/Infrastructure/Decorators/Auth/AuthedUser";
import { Authorize } from "src/Infrastructure/Decorators/Auth/Authorize";

@Controller('auth')
export class UserController {
    constructor(private jwtService: JwtService) {}

    @Post('login')
    @UseGuards(AuthGuard('basic'))
    async login(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const user: UserDTO = request.user as UserDTO,
              jwt = await this.jwtService.signAsync({ ...user }, { subject: user.id }),
              { id, email, ...rest } = user

        return { jwt, id, email }
    }

    @Post('logout')
    @Authorize()
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt', {
            maxAge: null
        });

        return 'Ok'
    }
}