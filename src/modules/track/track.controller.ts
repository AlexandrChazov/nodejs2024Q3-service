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
import { CreateDto } from "./dto";
import { TrackService } from "./track.service";

@Controller("track")
export class TrackController {
	constructor(private readonly trackService: TrackService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getAll() {
		return this.trackService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(":id")
	getById(@Param() dto: IdDto) {
		return this.trackService.getById(dto.id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	create(@Body() dto: CreateDto) {
		return this.trackService.create(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Put(":id")
	update(@Param() userIdDto: IdDto, @Body() dto: CreateDto) {
		return this.trackService.update(userIdDto.id, dto);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(":id")
	delete(@Param() dto: IdDto) {
		return this.trackService.delete(dto.id);
	}
}
