import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AlbumEntity } from "../album/album.entity";

@Entity({ name: "fav-album" })
export class FavAlbumEntity {
	@PrimaryGeneratedColumn()
	id: number;

	// todo make sure it's NOT NULL
	// it's not necessary to specify, get type error without it
	@Column("uuid")
	albumId: string;

	@ManyToOne(() => AlbumEntity, (artist) => artist.favAlbums)
	album: AlbumEntity;
}
