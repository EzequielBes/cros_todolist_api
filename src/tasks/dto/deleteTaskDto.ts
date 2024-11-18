import { ApiProperty } from "@nestjs/swagger";

export class DeleteTaskDto {
    @ApiProperty({ description: 'Id da task ou subtask' })
    id: string
}
