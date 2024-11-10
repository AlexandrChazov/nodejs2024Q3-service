import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";

import { database } from "../../database";
import { CreateDto } from "./dto";

@Injectable()
export class AlbumService {
	async getAll() {
		return database.albums;
	}

	async getById(id: string) {
		const album = database.albums.find((a) => a.id === id);
		if (!album) throw new NotFoundException("Album not found");
		return album;
	}

	async create(dto: CreateDto) {
		const newAlbum = {
			id: randomUUID(),
			name: dto.name,
			year: dto.year,
			artistId: dto.artistId || null,
		};
		database.albums.push(newAlbum);
		return newAlbum;
	}

	async update(id: string, dto: CreateDto) {
		const album = database.albums.find((a) => a.id === id);
		if (!album) throw new NotFoundException("Album not found");
		album.name = dto.name;
		album.year = dto.year;
		album.artistId = dto.artistId || null;
		return album;
	}

	async delete(id: string) {
		const index = database.albums.findIndex((a) => a.id === id);
		if (!~index) throw new NotFoundException("Album not found");
		const track = database.tracks.find((t) => t.albumId === id);
		if (track) {
			track.albumId = null;
		}
		database.albums.splice(index, 1);
	}
}
