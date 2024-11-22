import { ForbiddenException, Injectable } from "@nestjs/common";
import { compare } from "bcrypt";

import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { CredentialsDto } from "./dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private tokenService: TokenService,
	) {}

	async login(
		body: CredentialsDto,
	): Promise<{ accessToken: string; refreshToken: string }> {
		const { login, password } = body;
		const user = await this.usersService.getByLogin(login);
		if (!user) {
			throw new ForbiddenException(
				"User with such login and password not found",
			);
		}
		const isPassed = await compare(password, user.password);
		if (!isPassed) {
			throw new ForbiddenException(
				"User with such login and password not found",
			);
		}
		return this.tokenService.generateTokens({ userId: user.id, login });
	}
}
