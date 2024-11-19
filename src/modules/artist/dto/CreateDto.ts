import { IsBoolean, IsString } from "class-validator";

export class CreateDto {
	@IsString()
	name: string;

	@IsBoolean()
	grammy: boolean;
}
