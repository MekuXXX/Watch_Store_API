import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import env from 'src/utils/env';

export class QueriesDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit: number = env.PAGINATION_LIMIT;

  @IsInt()
  @IsPositive()
  @IsOptional()
  page: number = env.PAGINATION_PAGE;

  @IsString()
  @IsOptional()
  query: string = '';
}
