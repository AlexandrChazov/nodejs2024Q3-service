import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { ArtistEntity } from "../artist/artist.entity";
import { FavAlbumEntity } from "../favorite/fav-album.entity";
import { TrackEntity } from "../track/track.entity";

@Entity({ name: "album" })
export class AlbumEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string; // uuid v4

	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "int", unsigned: true })
	year: number;

	@Column({ type: "uuid", nullable: true })
	artistId: string | null; // refers to Artist

	@ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
		onDelete: "SET NULL",
		onUpdate: "CASCADE",
	})
	artist: ArtistEntity;

	@OneToMany(() => TrackEntity, (track) => track.artist)
	tracks: TrackEntity[];

	@OneToMany(() => FavAlbumEntity, (fav) => fav.album)
	favAlbums: FavAlbumEntity[];
}
