import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateDto } from "./dto";
import { TrackEntity } from "./track.entity";

@Injectable()
export class TrackService {
	constructor(
		@InjectRepository(TrackEntity)
		private trackRepository: Repository<TrackEntity>,
	) {}

	async getAll(): Promise<TrackEntity[]> {
		return await this.trackRepository.find();
	}

	async getById(id: string): Promise<TrackEntity> {
		const track = await this.trackRepository.findOne({ where: { id } });
		if (!track) throw new NotFoundException("Track not found");
		return track;
	}

	async create(dto: CreateDto): Promise<TrackEntity> {
		const track = new TrackEntity();
		track.name = dto.name;
		track.artistId = dto.artistId || null;
		track.albumId = dto.albumId || null;
		track.duration = dto.duration;
		await this.trackRepository.save(track);
		return track;
	}

	async update(id: string, dto: CreateDto): Promise<TrackEntity> {
		const track = await this.trackRepository.findOne({ where: { id } });
		if (!track) throw new NotFoundException("Track not found");
		track.name = dto.name;
		track.artistId = dto.artistId || null;
		track.albumId = dto.albumId || null;
		track.duration = dto.duration;
		return track;
	}

	async delete(id: string): Promise<void> {
		const track = await this.trackRepository.findOne({ where: { id } });
		if (!track) throw new NotFoundException("Track not found");
		await this.trackRepository.delete(id);
	}
}
