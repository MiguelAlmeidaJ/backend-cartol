import { AppError } from "../../shared/errors/AppError.js";
import { UserRepository } from "./user.repository.js";
import { UpdateUserDTO } from "./user.dto.js";

export class UserService {
    private userRepository = new UserRepository();

    async getProfile(userId: string) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new AppError('Usuário não encontrado', 404);
        }

        return user;
    }

    async updateProfile(userId: string, data: UpdateUserDTO) {
        if (data.email) {
            const emailAlreadyUsed = await this.userRepository.findByEmail(data.email);

            if (emailAlreadyUsed && emailAlreadyUsed.id !== userId) {
                throw new AppError('Email já está em uso', 409);
            }
        }

        return this.userRepository.update(userId, data);
    }
}