import { IsBoolean, IsString } from "class-validator";

export class UpdateDto {
	@IsString()
	name: string;

	@IsBoolean()
	grammy: boolean;
}
