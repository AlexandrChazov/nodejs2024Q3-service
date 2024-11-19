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

	@IsUUID()
	@IsOptional()
	artistId: string | null; // refers to Artist

	@IsUUID()
	@IsOptional()
	albumId: string | null; // refers to Album

	@IsInt()
	@IsPositive()
	duration: number; // integer number
}
