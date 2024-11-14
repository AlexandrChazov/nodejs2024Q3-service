import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ArtistEntity } from "../artist/artist.entity";

@Entity({ name: "fav-artist" })
export class FavArtistEntity {
	@PrimaryGeneratedColumn()
	id: number;

	// todo make sure it's NOT NULL
	// it's not necessary to specify, get type error without it
	@Column("uuid")
	artistId: string;

	@ManyToOne(() => ArtistEntity, (artist) => artist.favArtists)
	artist: ArtistEntity;
}
