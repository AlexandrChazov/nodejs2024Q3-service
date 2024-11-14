import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AlbumEntity } from "../album/album.entity";

@Entity({ name: "fav-album" })
export class FavAlbumEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => AlbumEntity, (artist) => artist.favAlbums)
	album: AlbumEntity;
}
