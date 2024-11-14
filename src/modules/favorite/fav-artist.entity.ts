import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ArtistEntity } from "../artist/artist.entity";

@Entity({ name: "fav-artist" })
export class FavArtistEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => ArtistEntity, (artist) => artist.favArtists)
	artist: ArtistEntity;
}
