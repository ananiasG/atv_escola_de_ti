import { TypeItem } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, Max } from "class-validator";

export class CreateItemDto {
  @ApiProperty({ example: "Espada de Fogo" })
  @IsString()
  name: string;

  @ApiProperty({ enum: TypeItem, example: "WEAPON" })
  @IsEnum(TypeItem)
  type: TypeItem;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Max(3)
  strength: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Max(3)
  defense: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  idUser: number
}
