import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	async generateTokens(payload: {
		userId: string;
		login: string;
	}): Promise<{ accessToken: string; refreshToken: string }> {
		return {
			accessToken: this.jwtService.sign(payload, {
				secret: process.env.JWT_SECRET_KEY,
				expiresIn: process.env.TOKEN_EXPIRE_TIME,
			}),
			refreshToken: this.jwtService.sign(payload, {
				secret: process.env.JWT_SECRET_REFRESH_KEY,
				expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
			}),
		};
	}
}
