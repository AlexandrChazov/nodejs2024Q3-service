import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { AlbumEntity } from "../album/album.entity";

@Entity({ name: "fav-album" })
export class FavAlbumEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("uuid")
	albumId: string;

	@ManyToOne(() => AlbumEntity, (artist) => artist.favAlbums, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	album: AlbumEntity;
}
