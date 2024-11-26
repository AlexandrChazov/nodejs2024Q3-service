import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ArtistEntity } from "../artist/artist.entity";

@Entity({ name: "fav-artist" })
export class FavArtistEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("uuid")
	artistId: string;

	@ManyToOne(() => ArtistEntity, (artist) => artist.favArtists, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	artist: ArtistEntity;
}
