import { ApiProperty } from "@nestjs/swagger";
import { SubTask } from "../sub-task";

export class ResponseTask {
  @ApiProperty({ description: "bearer token" })
  name: string;
  @ApiProperty({ description: "bearer token" })
  description: string;
  @ApiProperty({ description: "bearer token" })
  tag: string;
  @ApiProperty({ description: "bearer token" })
  document: any;
  @ApiProperty({ description: "bearer token" })
  status: boolean;
  @ApiProperty({ description: "bearer token" })
  subtasks: SubTask[];
  @ApiProperty({ description: "bearer token" })
  id: string;
  @ApiProperty({ description: "bearer token" })
  created_at: Date;
  @ApiProperty({ description: "bearer token" })
  updated_at?: Date;
}
