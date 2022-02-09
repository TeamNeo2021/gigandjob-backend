import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function Authorize() { 
    return applyDecorators(UseGuards(AuthGuard('jwt')))
}