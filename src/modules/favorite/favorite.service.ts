import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { AlbumEntity } from "../album/album.entity";
import { ArtistEntity } from "../artist/artist.entity";
import { TrackEntity } from "../track/track.entity";
import { FavAlbumEntity } from "./fav-album.entity";
import { FavArtistEntity } from "./fav-artist.entity";
import { FavTrackEntity } from "./fav-track.entity";

@Injectable()
export class FavoriteService {
	constructor(
		@InjectRepository(FavAlbumEntity)
		private favAlbumRepository: Repository<FavAlbumEntity>,
		@InjectRepository(FavArtistEntity)
		private favArtistRepository: Repository<FavArtistEntity>,
		@InjectRepository(FavTrackEntity)
		private favTrackRepository: Repository<FavTrackEntity>,
	) {}

	async getAll(): Promise<{
		albums: AlbumEntity[];
		artists: ArtistEntity[];
		tracks: TrackEntity[];
	}> {
		const albums = await this.favAlbumRepository.find({
			relations: { album: true },
		});
		const artists = await this.favArtistRepository.find({
			relations: { artist: true },
		});
		const tracks = await this.favTrackRepository.find({
			relations: { track: true },
		});
		return {
			albums: albums.map((album) => album.album),
			artists: artists.map((artist) => artist.artist),
			tracks: tracks.map((track) => track.track),
		};
	}

	async addAlbum(albumId: string): Promise<void> {
		const favAlbum = new FavAlbumEntity();
		favAlbum.albumId = albumId;
		try {
			await this.favAlbumRepository.save(favAlbum);
		} catch {
			throw new UnprocessableEntityException("Album not found");
		}
	}

	async deleteAlbum(albumId: string): Promise<void> {
		const favAlbum = await this.favAlbumRepository.findOne({
			where: { albumId },
		});
		if (!favAlbum) {
			throw new NotFoundException("Album not found");
		}
		await this.favAlbumRepository.delete({ albumId });
	}

	async addArtist(artistId: string): Promise<void> {
		const favArtist = new FavArtistEntity();
		favArtist.artistId = artistId;
		try {
			await this.favArtistRepository.save(favArtist);
		} catch {
			throw new UnprocessableEntityException("Artist not found");
		}
	}

	async deleteArtist(artistId: string): Promise<void> {
		const favArtist = await this.favArtistRepository.findOne({
			where: { artistId },
		});
		if (!favArtist) {
			throw new NotFoundException("Artist not found");
		}
		await this.favArtistRepository.delete({ artistId });
	}

	async addTrack(trackId: string): Promise<void> {
		const favTrack = new FavTrackEntity();
		favTrack.trackId = trackId;
		try {
			await this.favTrackRepository.save(favTrack);
		} catch {
			throw new UnprocessableEntityException("Track not found");
		}
	}

	async deleteTrack(trackId: string): Promise<void> {
		const favTrack = await this.favTrackRepository.findOne({
			where: { trackId },
		});
		if (!favTrack) {
			throw new NotFoundException("Track not found");
		}
		await this.favTrackRepository.delete({ trackId });
	}
}
