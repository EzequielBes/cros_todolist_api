import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateAccountInput {
  @ApiProperty({
    description: "email",
    example: "emailexemplo@gmail.com",
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: "nome do usuario",
    example: "Jon",
  })
  @IsString()
  username: string;
  @ApiProperty({
    description: "Password",
    example: "Strong@1234",
  })
  @IsStrongPassword()
  password: string;
}
