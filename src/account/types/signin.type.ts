import { ApiProperty } from "@nestjs/swagger";

export class Signintype  {
    @ApiProperty({
    description: "access_token",
    required: false, 
  })
    access_token: string
}
