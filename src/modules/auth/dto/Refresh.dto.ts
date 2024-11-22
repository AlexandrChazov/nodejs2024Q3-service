import { IsString } from "class-validator";

export class RefreshDto {
	@IsString({ message: "must be a string" })
	refreshToken: string;
}
