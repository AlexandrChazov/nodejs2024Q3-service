import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { AlbumEntity } from "../album/album.entity";
import { FavArtistEntity } from "../favorite/fav-artist.entity";
import { TrackEntity } from "../track/track.entity";

@Entity({ name: "artist" })
export class ArtistEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string; // uuid v4

	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "boolean" })
	grammy: boolean;

	@OneToMany(() => AlbumEntity, (album) => album.artist)
	albums: AlbumEntity[];

	@OneToMany(() => TrackEntity, (track) => track.artist)
	tracks: TrackEntity[];

	@OneToMany(() => FavArtistEntity, (fav) => fav.artist)
	favArtists: FavArtistEntity[];
}
