import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";

import { database } from "../../database";
import { Artist, User } from "../../types";
import { CreateDto, UpdateDto } from "./dto";

@Injectable()
export class ArtistService {
	async getAll() {
		return database.artists;
	}

	async getById(id: string) {
		const artist = database.artists.find((a) => a.id === id);
		if (!artist) throw new NotFoundException("Artist not found");
		return artist;
	}

	async create(dto: CreateDto) {
		const newArtist: Artist = {
			id: randomUUID(),
			name: dto.name,
			grammy: dto.grammy,
		};
		database.artists.push(newArtist);
		return newArtist;
	}

	async update(id: string, dto: UpdateDto) {
		const artist = database.artists.find((a) => a.id === id);
		if (!artist) {
			throw new NotFoundException("Artist not found");
		}
		artist.name = dto.name;
		artist.grammy = dto.grammy;
		return artist;
	}

	async delete(id: string) {
		const index = database.artists.findIndex((a) => a.id === id);
		if (!~index) {
			throw new NotFoundException("Artist not found");
		}
		database.artists.splice(index, 1);
	}
}
