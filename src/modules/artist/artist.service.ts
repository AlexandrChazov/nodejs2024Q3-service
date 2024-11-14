import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Artist } from "../../types";
import { ArtistEntity } from "./artist.entity";
import { CreateDto, UpdateDto } from "./dto";

@Injectable()
export class ArtistService {
	constructor(
		@InjectRepository(ArtistEntity)
		private artistRepository: Repository<Artist>,
	) {}

	async getAll(): Promise<Artist[]> {
		return await this.artistRepository.find();
	}

	async getById(id: string) {
		const artist = await this.artistRepository.findOne({ where: { id } });
		if (!artist) throw new NotFoundException("Artist not found");
		return artist;
	}

	async create(dto: CreateDto) {
		const artist = new ArtistEntity();
		artist.name = dto.name;
		artist.grammy = dto.grammy;
		await this.artistRepository.save(artist);
		return artist;
	}

	async update(id: string, dto: UpdateDto) {
		const artist = await this.artistRepository.findOne({ where: { id } });
		if (!artist) {
			throw new NotFoundException("Artist not found");
		}
		artist.name = dto.name;
		artist.grammy = dto.grammy;
		await this.artistRepository.save(artist);
		return artist;
	}

	async delete(id: string) {
		const artist = await this.artistRepository.findOne({ where: { id } });
		if (!artist) {
			throw new NotFoundException("Artist not found");
		}
		await this.artistRepository.delete(id);
	}
}
