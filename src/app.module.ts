import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AlbumModule } from "./modules/album/album.module";
import { ArtistModule } from "./modules/artist/artist.module";
import { FavoriteModule } from "./modules/favorite/favorite.module";
import { TrackModule } from "./modules/track/track.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		TrackModule,
		ArtistModule,
		AlbumModule,
		FavoriteModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
