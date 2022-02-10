import { EntitiesFactory } from "../Core/EntitiesFactory.service";
import { CreateUserDTO } from "../DTO/User/CreateUser.dto";
import { LoginUserDTO } from "../DTO/User/LoginUser.dto";
import { UserDTO } from "../DTO/User/User.dto";
import { UserRepository } from "../Repositories/User/repository.interface";

type Commands = CreateUserDTO | LoginUserDTO

export class UserApplicationService {
    constructor(private repository: UserRepository) {}

    handle(createUser: CreateUserDTO): Promise<void>
    handle(logUser: LoginUserDTO): Promise<UserDTO | undefined>
    async handle(cmd: Commands): Promise<any> {
        if (cmd instanceof CreateUserDTO) {
            await this.repository.save(new UserDTO(cmd.id, cmd.email, cmd.password));
        } else if (cmd instanceof LoginUserDTO) {
            const dto = await this.repository.find(cmd.email);

            if (!dto) return null

            const user = EntitiesFactory.fromUserDTOToUser(dto);

            if (user.passwordMatches(cmd.password)) return dto;
        }
    }
}