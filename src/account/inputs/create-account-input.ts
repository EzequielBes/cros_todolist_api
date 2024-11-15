import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateAccountInput {
    @ApiProperty({
        description: 'email',
        example: 'zz@gmail.com',
      })
      @IsString()
    email:string
    @ApiProperty({
        description: 'nome do usuario',
        example: 'zzet',
      })
      @IsString()
    username:string
    @IsString()
    password:string

}
