import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TrackController } from "./track.controller";
import { TrackEntity } from "./track.entity";
import { TrackService } from "./track.service";

@Module({
	controllers: [TrackController],
	imports: [TypeOrmModule.forFeature([TrackEntity])],
	providers: [TrackService],
})
export class TrackModule {}
