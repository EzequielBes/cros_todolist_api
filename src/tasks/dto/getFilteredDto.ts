import { IsString, IsNotEmpty } from 'class-validator';

export class GetFilteredDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}
