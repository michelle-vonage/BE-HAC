import { IsIP, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateIpDto {
  @IsNotEmpty()
  @IsIP()
  address: string;

  @IsOptional()
  @IsString()
  description?: string;
}
