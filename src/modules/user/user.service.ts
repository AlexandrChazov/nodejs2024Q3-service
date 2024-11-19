import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { User } from "../../types";
import { CreateUserDto, UpdatePasswordDto } from "./dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
	) {}

	async getAll(): Promise<UserEntity[]> {
		return await this.userRepository.find();
	}

	async getById(id: string): Promise<UserEntity> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException("User not found");
		}
		return { ...user, password: undefined };
	}

	async create(dto: CreateUserDto) {
		const newUser = new UserEntity();
		newUser.login = dto.login;
		newUser.password = dto.password;
		newUser.version = 1;
		await this.userRepository.save(newUser);
		return {
			...newUser,
			createdAt: new Date(newUser.createdAt).getTime(),
			updatedAt: new Date(newUser.updatedAt).getTime(),
			password: undefined,
		};
	}

	async updatePassword(id: string, dto: UpdatePasswordDto): Promise<User> {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException("User not found");
		}
		const oldPassword = user.password;
		if (oldPassword !== dto.oldPassword) {
			throw new ForbiddenException("Forbidden");
		}
		user.password = dto.newPassword;
		user.version += 1;
		await this.userRepository.save(user);
		return {
			...user,
			createdAt: new Date(user.createdAt).getTime(),
			updatedAt: new Date(user.updatedAt).getTime(),
			password: undefined,
		};
	}

	async delete(id: string) {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) {
			throw new NotFoundException("User not found");
		}
		await this.userRepository.delete(id);
	}
}
