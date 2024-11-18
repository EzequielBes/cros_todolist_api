import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTaskDTO {
  @ApiProperty({ description: 'Id da task ou subtask', example: '32dda4rer13r' })
  @IsString()
  @IsOptional()
   task_id:string
    
  @ApiProperty({ description: 'Título da tarefa', example: 'Fazer cafe da manha' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Descrição da tarefa', example: 'Fazer um cafe da manha completo' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Categoria da tarefa', example: 'Rotina' })
  @IsString()
  @IsOptional()
  tag: string;

  @ApiPropertyOptional({ description: 'Prioridade da tarefa', example: 'Baixa' })
  @IsString()
  @IsOptional()
  tagPrioridade: string;

  @ApiPropertyOptional({ 
    description: 'status da tarefa', 
    type: 'string', 
  })
  @IsOptional()
  status: boolean; 

  @ApiPropertyOptional({ 
    description: 'Documento relacionado à tarefa', 
    type: 'string', 
    format: 'binary',
    example: 'arquivo.pdf'
  })
  @IsOptional()
  document: Buffer; 

}
