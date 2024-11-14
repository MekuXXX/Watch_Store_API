import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateConfigurationDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsOptional()
  description?: string;
}
