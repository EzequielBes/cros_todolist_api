import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  email:string

  @ApiProperty({ description: 'Título da tarefa', example: 'Fazer cafe da manha' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Descrição da tarefa', example: 'Fazer um cafe da manha completo' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({ description: 'tag da tarefa', example: 'Rotina' })
  @IsString()
  @IsOptional()
  tag: string;

  @ApiPropertyOptional({ description: 'status da tarefa', example: 'true -- concluido' })
  @IsString()
  @IsOptional()
  status: string;

  @ApiPropertyOptional({ 
    description: 'Documento relacionado à tarefa', 
    type: 'string', 
    format: 'binary',
    example: 'arquivo.pdf'
  })
  @IsOptional()
  document: Buffer; 
}
