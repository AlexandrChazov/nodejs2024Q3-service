import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { randomUUID } from "node:crypto";

import { database } from "../../database";
import { User } from "../../types";
import { CreateUserDto, UpdatePasswordDto } from "./dto";

@Injectable()
export class UserService {
	async getAll() {
		return database.users;
	}

	async getById(id: string) {
		const user = database.users.find((user) => user.id === id);
		if (!user) {
			throw new NotFoundException("User not found");
		}
		return { ...user, password: undefined };
	}

	async create(dto: CreateUserDto): Promise<User> {
		const newUser: User = {
			id: randomUUID(),
			login: dto.login,
			password: dto.password,
			version: 1,
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};
		database.users.push(newUser);
		return { ...newUser, password: undefined };
	}

	async updatePassword(id: string, dto: UpdatePasswordDto): Promise<User> {
		const user = database.users.find((user) => user.id === id);
		if (!user) {
			throw new NotFoundException("User not found");
		}
		const oldPassword = user.password;
		if (oldPassword !== dto.oldPassword) {
			throw new ForbiddenException("Forbidden");
		}
		user.password = dto.newPassword;
		return user;
	}

	async delete(id: string) {
		const index = database.users.findIndex((user) => user.id === id);
		if (!~index) {
			throw new NotFoundException("User not found");
		}
		database.users.splice(index, 1);
	}
}
