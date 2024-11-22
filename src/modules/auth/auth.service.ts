import {
	BadRequestException,
	ForbiddenException,
	Injectable,
} from "@nestjs/common";
import { compare } from "bcrypt";

import { Tokens } from "../../types";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";
import { CredentialsDto } from "./dto";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UserService,
		private tokenService: TokenService,
	) {}

	async signup(body: CredentialsDto): Promise<Tokens & { id: string }> {
		const { login } = body;
		const existedUser = await this.usersService.getByLogin(login);
		if (existedUser) {
			throw new BadRequestException("User with such login already exists");
		}
		const newUser = await this.usersService.create(body);
		const tokens = await this.tokenService.generateTokens({
			userId: newUser.id,
			login: newUser.login,
		});
		return { ...tokens, id: newUser.id };
	}

	async login(body: CredentialsDto): Promise<Tokens> {
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
		return await this.tokenService.generateTokens({ userId: user.id, login });
	}

	async refresh(refreshToken: string): Promise<Tokens> {
		const tokenPayload = await this.tokenService.validate(refreshToken);
		return await this.tokenService.generateTokens({
			userId: tokenPayload.userId,
			login: tokenPayload.login,
		});
	}
}
