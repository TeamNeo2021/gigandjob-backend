import { CollectionReference } from "@google-cloud/firestore";
import { Inject, Injectable } from "@nestjs/common";
import { UserDTO } from "src/Application/DTO/User/User.dto";
import { UserRepository } from "src/Application/Repositories/User/repository.interface";

@Injectable()
export class UserFirestoreAdapterService implements UserRepository {
    constructor(@Inject('users') private collection: CollectionReference<UserDTO>) {} 

    async find(email: string): Promise<UserDTO> {
        const query = await this.collection.where('email', '==', email).get(),
              doc = query.docs[0]?.data()

        if (!doc) return doc

        return new UserDTO(doc.id, doc.email, doc.password)
    }
    async save(user: UserDTO): Promise<void> {
        await this.collection.doc(user.id).set({ ...user })
    }
}