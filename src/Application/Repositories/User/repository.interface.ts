import { UserDTO } from "src/Application/DTO/User/User.dto";

export interface UserRepository {
    find(email: string): Promise<UserDTO>
    save(user: UserDTO): Promise<void>
}