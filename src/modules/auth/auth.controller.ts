import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";

import { AuthService } from "./auth.service";
import { CredentialsDto } from "./dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(StatusCodes.OK)
	@Post("login")
	login(@Body() body: CredentialsDto) {
		return this.authService.login(body);
	}
}
