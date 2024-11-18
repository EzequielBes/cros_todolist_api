import { ApiProperty } from "@nestjs/swagger"

export class SigninAccountDto {
    @ApiProperty({
    description: "Email",
    example: "emailexemplo@gmail.com",
    required: true, 
  })
    email: string

     @ApiProperty({
    description: "Password",
    example: "Strong@1234",
    required: true, 
  })
    password: string
}
