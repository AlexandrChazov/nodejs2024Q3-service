import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AlbumController } from "./album.controller";
import { AlbumEntity } from "./album.entity";
import { AlbumService } from "./album.service";

@Module({
	controllers: [AlbumController],
	imports: [TypeOrmModule.forFeature([AlbumEntity])],
	providers: [AlbumService],
})
export class AlbumModule {}
