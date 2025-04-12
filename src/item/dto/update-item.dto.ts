import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNumber, Max, IsOptional } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
    @ApiProperty({ example: "Espada de Fogo" })
      @IsString()
      @IsOptional()
      name: string;
    
      @ApiProperty({ example: 1 })
      @IsNumber()
      @Max(3)
      @IsOptional()
      strength: number;
    
      @ApiProperty({ example: 2 })
      @IsNumber()
      @Max(3)
      @IsOptional()
      defense: number;
    
      @ApiProperty({ example: 1 })
      @IsNumber()
      @IsOptional()
      idUser: number

}
