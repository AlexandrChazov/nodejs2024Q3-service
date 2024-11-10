import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "node:crypto";

import { database } from "../../database";
import { Track } from "../../types";
import { CreateDto } from "./dto";

@Injectable()
export class TrackService {
	async getAll(): Promise<Track[]> {
		return database.tracks;
	}

	async getById(id: string): Promise<Track> {
		const track = database.tracks.find((t) => t.id === id);
		if (!track) throw new NotFoundException("Track not found");
		return track;
	}

	async create(dto: CreateDto): Promise<Track> {
		const newTrack: Track = {
			id: randomUUID(),
			name: dto.name,
			artistId: dto.artistId || null,
			albumId: dto.albumId || null,
			duration: dto.duration,
		};
		database.tracks.push(newTrack);
		return newTrack;
	}

	async update(id: string, dto: CreateDto): Promise<Track> {
		const track = database.tracks.find((t) => t.id === id);
		if (!track) throw new NotFoundException("Track not found");
		track.name = dto.name;
		track.artistId = dto.artistId || null;
		track.albumId = dto.albumId || null;
		track.duration = dto.duration;
		return track;
	}

	async delete(id: string): Promise<void> {
		const index = database.tracks.findIndex((t) => t.id === id);
		if (!~index) throw new NotFoundException("Track not found");
		database.tracks.splice(index, 1);
	}
}
