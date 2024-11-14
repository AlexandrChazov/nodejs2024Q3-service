import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TrackEntity } from "../track/track.entity";

@Entity({ name: "fav-track" })
export class FavTrackEntity {
	@PrimaryGeneratedColumn()
	id: number;

	// todo make sure it's NOT NULL
	// it's not necessary to specify, get type error without it
	@Column("uuid")
	trackId: string;

	@ManyToOne(() => TrackEntity, (artist) => artist.favTracks)
	track: TrackEntity;
}
