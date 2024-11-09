import {
	IsInt,
	IsOptional,
	IsPositive,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateDto {
	@IsString()
	name: string;

	@IsInt()
	@IsPositive()
	year: number;

	@IsUUID()
	@IsOptional()
	artistId: string | null; // refers to Artist
}
