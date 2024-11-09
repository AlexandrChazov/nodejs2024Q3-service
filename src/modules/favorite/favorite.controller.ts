import {
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from "@nestjs/common";

import { IdDto } from "../dto";
import { FavoriteService } from "./favorite.service";

@Controller("favs")
export class FavoriteController {
	constructor(private readonly favService: FavoriteService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	getAll() {
		return this.favService.getAll();
	}

	@HttpCode(HttpStatus.CREATED)
	@Post("track/:id")
	addTrack(@Param() dto: IdDto) {
		return this.favService.addTrack(dto.id);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete("track/:id")
	deleteTrack(@Param() dto: IdDto) {
		return this.favService.deleteTrack(dto.id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post("album/:id")
	addAlbum(@Param() dto: IdDto) {
		return this.favService.addAlbum(dto.id);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete("album/:id")
	deleteAlbum(@Param() dto: IdDto) {
		return this.favService.deleteAlbum(dto.id);
	}

	@HttpCode(HttpStatus.CREATED)
	@Post("artist/:id")
	addArtist(@Param() dto: IdDto) {
		return this.favService.addArtist(dto.id);
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete("artist/:id")
	deleteArtist(@Param() dto: IdDto) {
		return this.favService.deleteArtist(dto.id);
	}
}
