import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from "@nestjs/common";

import { IdDto } from "../dto";
import { CreateUserDto, UpdatePasswordDto } from "./dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getAll() {
		return this.userService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(":id")
	getById(@Param() dto: IdDto) {
		return this.userService.getById(dto.id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() dto: CreateUserDto) {
		return this.userService.create(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put(":id")
	updatePassword(@Param() userIdDto: IdDto, @Body() dto: UpdatePasswordDto) {
		return this.userService.updatePassword(userIdDto.id, dto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(":id")
	delete(@Param() dto: IdDto) {
		return this.userService.delete(dto.id);
	}
}
