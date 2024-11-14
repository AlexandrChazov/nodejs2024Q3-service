import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TrackEntity } from "../track/track.entity";

@Entity({ name: "fav-track" })
export class FavTrackEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("uuid")
	trackId: string;

	@ManyToOne(() => TrackEntity, (artist) => artist.favTracks, {
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	})
	track: TrackEntity;
}
