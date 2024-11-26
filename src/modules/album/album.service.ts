import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AlbumEntity } from "./album.entity";
import { CreateDto } from "./dto";

@Injectable()
export class AlbumService {
	constructor(
		@InjectRepository(AlbumEntity)
		private albumRepository: Repository<AlbumEntity>,
	) {}

	async getAll(): Promise<AlbumEntity[]> {
		return await this.albumRepository.find();
	}

	async getById(id: string) {
		const album = await this.albumRepository.findOne({ where: { id } });
		if (!album) throw new NotFoundException("Album not found");
		return album;
	}

	async create(dto: CreateDto): Promise<AlbumEntity> {
		const album = new AlbumEntity();
		album.name = dto.name;
		album.year = dto.year;
		album.artistId = dto.artistId || null;
		await this.albumRepository.save(album);
		return album;
	}

	async update(id: string, dto: CreateDto): Promise<AlbumEntity> {
		const album = await this.albumRepository.findOne({ where: { id } });
		if (!album) throw new NotFoundException("Album not found");
		album.name = dto.name;
		album.year = dto.year;
		album.artistId = dto.artistId || null;
		await this.albumRepository.save(album);
		return album;
	}

	async delete(id: string): Promise<void> {
		const album = await this.albumRepository.findOne({ where: { id } });
		if (!album) throw new NotFoundException("Album not found");
		await this.albumRepository.delete(id);
	}
}
