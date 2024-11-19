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
import { AlbumService } from "./album.service";
import { CreateDto } from "./dto";

@Controller("album")
export class AlbumController {
	constructor(private readonly albumService: AlbumService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getAll() {
		return this.albumService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(":id")
	getById(@Param() dto: IdDto) {
		return this.albumService.getById(dto.id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() dto: CreateDto) {
		return this.albumService.create(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put(":id")
	update(@Param() userIdDto: IdDto, @Body() dto: CreateDto) {
		return this.albumService.update(userIdDto.id, dto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(":id")
	delete(@Param() dto: IdDto) {
		return this.albumService.delete(dto.id);
	}
}
