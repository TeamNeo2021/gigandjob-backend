import { applyDecorators, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthedUser = createParamDecorator((data: unknown, ec: ExecutionContext) => {
    const user = ec.switchToHttp().getRequest().user
    return user
})