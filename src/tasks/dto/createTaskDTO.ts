import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  email:string

  @ApiProperty({ description: 'Título da tarefa', example: 'Fazer cafe da manha' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Descrição da tarefa', example: 'Fazer um cafe da manha completo' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Categoria da tarefa', example: 'Rotina' })
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional({ description: 'Prioridade da tarefa', example: 'Baixa' })
  @IsString()
  @IsOptional()
  tagPrioridade: string;

  @ApiPropertyOptional({ 
    description: 'Documento relacionado à tarefa', 
    type: 'string', 
    format: 'binary',
    example: 'arquivo.pdf'
  })
  @IsOptional()
  document: Buffer; 
}
