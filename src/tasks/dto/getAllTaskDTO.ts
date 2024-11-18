import { ApiProperty } from "@nestjs/swagger";

export class GetAuthorization {
    @ApiProperty({ description: 'bearer token'})
    authorization:string

}
