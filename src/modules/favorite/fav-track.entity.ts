import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { TrackEntity } from "../track/track.entity";

@Entity({ name: "fav-track" })
export class FavTrackEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => TrackEntity, (artist) => artist.favTracks)
	track: TrackEntity;
}
