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
import { ArtistService } from "./artist.service";
import { CreateDto } from "./dto";

@Controller("artist")
export class ArtistController {
	constructor(private readonly artistService: ArtistService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getAll() {
		return this.artistService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(":id")
	getById(@Param() dto: IdDto) {
		return this.artistService.getById(dto.id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() dto: CreateDto) {
		return this.artistService.create(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put(":id")
	update(@Param() userIdDto: IdDto, @Body() dto: CreateDto) {
		return this.artistService.update(userIdDto.id, dto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(":id")
	delete(@Param() dto: IdDto) {
		return this.artistService.delete(dto.id);
	}
}
