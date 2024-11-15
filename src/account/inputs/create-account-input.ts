import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAccountInput {
    @ApiProperty({
        description: 'email',
        example: 'emailexemplo@gmail.com',
      })
      @IsString()
    email:string
    @ApiProperty({
        description: 'nome do usuario',
        example: 'Jon',
      })
      @IsString()
    username:string
    @ApiProperty({
        description: 'Password',
        example: '******',
      })
    @IsString()
    password:string

}
