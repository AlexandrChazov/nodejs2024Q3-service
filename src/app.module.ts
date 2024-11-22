import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { dataSourceOptions } from "../postgres_db";
import { AlbumModule } from "./modules/album/album.module";
import { ArtistModule } from "./modules/artist/artist.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FavoriteModule } from "./modules/favorite/favorite.module";
import { TokenModule } from "./modules/token/token.module";
import { TrackModule } from "./modules/track/track.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot(dataSourceOptions),
		AlbumModule,
		ArtistModule,
		AuthModule,
		FavoriteModule,
		TokenModule,
		TrackModule,
		UserModule,
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
