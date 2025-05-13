import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSongDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly artists: string[];

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  @IsOptional()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  @IsOptional()
  readonly lyrics: string;
}
