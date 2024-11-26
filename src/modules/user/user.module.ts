import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Module({
	controllers: [UserController],
	exports: [UserService],
	imports: [TypeOrmModule.forFeature([UserEntity])],
	providers: [UserService],
})
export class UserModule {}
