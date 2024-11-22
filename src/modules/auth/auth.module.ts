import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { AuthGuard } from "../../guards";
import { TokenModule } from "../token/token.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	controllers: [AuthController],
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
		}),
		UserModule,
		TokenModule,
	],
	providers: [
		AuthService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
})
export class AuthModule {}
