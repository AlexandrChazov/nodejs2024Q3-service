import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { AlbumEntity } from "../album/album.entity";
import { ArtistEntity } from "../artist/artist.entity";
import { FavTrackEntity } from "../favorite/fav-track.entity";

@Entity({ name: "track" })
export class TrackEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string; // uuid v4

	@Column({ type: "varchar", length: 255 })
	name: string;

	// @Column({ type: "uuid", nullable: true })
	// artistId: string | null; // refers to Artist

	// @Column({ type: "uuid", nullable: true })
	// albumId: string | null; // refers to Album

	@Column({ type: "int", unsigned: true })
	duration: number; // integer number

	@ManyToOne(() => ArtistEntity, (artist) => artist.tracks)
	artist: ArtistEntity;

	@ManyToOne(() => AlbumEntity, (album) => album.tracks)
	album: AlbumEntity;

	@OneToMany(() => FavTrackEntity, (fav) => fav.track)
	favTracks: FavTrackEntity[];
}
