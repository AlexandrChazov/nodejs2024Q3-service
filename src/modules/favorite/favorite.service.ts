import {
	Injectable,
	NotFoundException,
	UnprocessableEntityException,
} from "@nestjs/common";

import { database } from "../../database";

@Injectable()
export class FavoriteService {
	async getAll() {
		return {
			albums: database.favorites.albums.map(
				(id) => database.albums.find((a) => a.id === id) || {},
			),
			artists: database.favorites.artists.map(
				(id) => database.artists.find((a) => a.id === id) || {},
			),
			tracks: database.favorites.tracks.map(
				(id) => database.tracks.find((t) => t.id === id) || {},
			),
		};
	}

	async addTrack(id: string) {
		const track = database.tracks.some((t) => t.id === id);
		if (!track) {
			throw new UnprocessableEntityException("Track not found");
		}
		database.favorites.tracks.push(id);
	}

	async deleteTrack(id: string) {
		const index = database.favorites.tracks.findIndex((fav) => fav === id);
		if (!~index) {
			throw new NotFoundException("Track not found");
		}
		database.favorites.tracks.splice(index, 1);
	}

	async addAlbum(id: string) {
		const album = database.albums.some((a) => a.id === id);
		if (!album) {
			throw new UnprocessableEntityException("Album not found");
		}
		database.favorites.albums.push(id);
	}

	async deleteAlbum(id: string) {
		const index = database.favorites.albums.findIndex((fav) => fav === id);
		if (!~index) {
			throw new NotFoundException("Album not found");
		}
		database.favorites.albums.splice(index, 1);
	}

	async addArtist(id: string) {
		const artist = database.artists.some((a) => a.id === id);
		if (!artist) {
			throw new UnprocessableEntityException("Artist not found");
		}
		database.favorites.artists.push(id);
	}

	async deleteArtist(id: string) {
		const index = database.favorites.artists.findIndex((fav) => fav === id);
		if (!~index) {
			throw new NotFoundException("Artist not found");
		}
		database.favorites.artists.splice(index, 1);
	}
}
