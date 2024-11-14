import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { FavAlbumEntity } from "./fav-album.entity";
import { FavArtistEntity } from "./fav-artist.entity";
import { FavTrackEntity } from "./fav-track.entity";
import { FavoriteController } from "./favorite.controller";
import { FavoriteService } from "./favorite.service";

@Module({
	controllers: [FavoriteController],
	imports: [
		TypeOrmModule.forFeature([FavAlbumEntity, FavArtistEntity, FavTrackEntity]),
	],
	providers: [FavoriteService],
})
export class FavoriteModule {}
