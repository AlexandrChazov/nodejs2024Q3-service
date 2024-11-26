import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ArtistController } from "./artist.controller";
import { ArtistEntity } from "./artist.entity";
import { ArtistService } from "./artist.service";

@Module({
	controllers: [ArtistController],
	imports: [TypeOrmModule.forFeature([ArtistEntity])],
	providers: [ArtistService],
})
export class ArtistModule {}
