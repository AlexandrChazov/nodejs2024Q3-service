import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "node:process";
import { DataSource } from "typeorm";

import { AlbumEntity } from "./modules/album/album.entity";
import { AlbumModule } from "./modules/album/album.module";
import { ArtistEntity } from "./modules/artist/artist.entity";
import { ArtistModule } from "./modules/artist/artist.module";
import { FavAlbumEntity } from "./modules/favorite/fav-album.entity";
import { FavArtistEntity } from "./modules/favorite/fav-artist.entity";
import { FavTrackEntity } from "./modules/favorite/fav-track.entity";
import { FavoriteModule } from "./modules/favorite/favorite.module";
import { TrackEntity } from "./modules/track/track.entity";
import { TrackModule } from "./modules/track/track.module";
import { UserEntity } from "./modules/user/user.entity";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			entities: [
				AlbumEntity,
				ArtistEntity,
				FavAlbumEntity,
				FavArtistEntity,
				FavTrackEntity,
				TrackEntity,
				UserEntity,
			],
			autoLoadEntities: true,
			synchronize: true,
		}),
		ConfigModule.forRoot(),
		UserModule,
		TrackModule,
		ArtistModule,
		AlbumModule,
		FavoriteModule,
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
