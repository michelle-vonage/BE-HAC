import { IsOptional, IsString } from 'class-validator';

export class UpdateIpDto {
  @IsOptional()
  @IsString()
  description?: string;
}
