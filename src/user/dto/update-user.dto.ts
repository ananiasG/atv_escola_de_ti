import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {


    @IsNotEmpty()
    @IsString()
    username?: string

    @IsNotEmpty()
    items?: CreateItemDto[];
}
