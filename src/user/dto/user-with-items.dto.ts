import { CreateItemDto } from "src/item/dto/create-item.dto";
import { Class, TypeItem } from "@prisma/client";
import { ArrayMaxSize, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class UserWithStatsDto {


    @ApiProperty({ example: "Arthur" })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({ example: "arthur157master" })
    @IsString()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty({ enum: Class, example: "WARRIOR" })
    @IsNotEmpty()
    @IsEnum(Class)
    class: Class;
    
    @ApiProperty({ example: 5 })
    @IsNotEmpty()
    level: number;
    
    @ApiProperty({ example: 5, maximum: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Max(10)
    strength: number;
    
    @ApiProperty({ example: 5, maximum: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Max(10)
    defense: number;

    @ApiPropertyOptional({ type: [CreateItemDto], maxItems: 3 })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateItemDto)
    @ArrayMaxSize(3)
    items: CreateItemDto[];
    
    @ApiProperty({ example: 5, maximum: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Max(10)
    totalStrength: number;

    @ApiProperty({ example: 5, maximum: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Max(10)
    totalDefense: number;
  }