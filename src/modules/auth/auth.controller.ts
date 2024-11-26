import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";

import { Public } from "../../decorators";
import { AuthService } from "./auth.service";
import { CredentialsDto, RefreshDto } from "./dto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@HttpCode(StatusCodes.CREATED)
	@Post("signup")
	signup(@Body() body: CredentialsDto) {
		return this.authService.signup(body);
	}

	@Public()
	@HttpCode(StatusCodes.OK)
	@Post("login")
	login(@Body() body: CredentialsDto) {
		return this.authService.login(body);
	}

	@Public()
	@HttpCode(StatusCodes.OK)
	@Post("refresh")
	refresh(@Body() body: RefreshDto) {
		return this.authService.refresh(body.refreshToken);
	}
}
