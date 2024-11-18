import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateAccountInput {
  @ApiProperty({
    description: "Novo email (opcional).",
    example: "emailexemplo@gmail.com",
    required: false, 
  })
  @IsOptional() 
  @IsEmail() 
  email?: string;

  @ApiProperty({
    description: "Novo nome de usuário (opcional).",
    example: "Jon",
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: "Nova senha (opcional).",
    example: "******",
    required: false,
  })
  @IsOptional()
  @IsStrongPassword()
  password?: string;
}
