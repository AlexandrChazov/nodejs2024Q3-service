import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { TokenPayload } from "../../types";

@Injectable()
export class TokenService {
	constructor(private readonly jwtService: JwtService) {}

	async generateTokens(
		payload: TokenPayload,
	): Promise<{ accessToken: string; refreshToken: string }> {
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

	async validate(refreshToken: string): Promise<TokenPayload> {
		try {
			return await this.jwtService.verifyAsync(refreshToken, {
				secret: process.env.JWT_SECRET_REFRESH_KEY,
			});
		} catch {
			throw new ForbiddenException("Refresh token is invalid or expired");
		}
	}
}
