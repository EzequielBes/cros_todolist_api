import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  email:string

  @ApiProperty({ description: 'Título da tarefa', example: 'Estudar TypeORM' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Descrição da tarefa', example: 'Revisar o módulo de relacionamentos no TypeORM' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'Categoria da tarefa', example: 'Estudos' })
  @IsString()
  @IsOptional()
  category: string;

  @ApiPropertyOptional({ description: 'Prioridade da tarefa', example: 'Alta' })
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
  document: any; 
}
