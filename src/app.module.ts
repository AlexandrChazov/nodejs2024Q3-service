import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { dataSourceOptions } from "../postgres_db";
import { HttpExceptionFilter } from "./exceptions";
import { LoggerInterceptor } from "./interceptors";
import { LoggerModule } from "./logger";
import { AlbumModule } from "./modules/album/album.module";
import { ArtistModule } from "./modules/artist/artist.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FavoriteModule } from "./modules/favorite/favorite.module";
import { TokenModule } from "./modules/token/token.module";
import { TrackModule } from "./modules/track/track.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
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
		LoggerModule,
	],
})
export class AppModule {
	constructor(private dataSource: DataSource) {}
}
