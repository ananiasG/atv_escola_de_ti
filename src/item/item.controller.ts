import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create item'})
  @ApiResponse({ status: 200, description:'Success', type: Boolean})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItem(createItemDto);
  }

  @Get('get-all')
  @ApiOperation({ summary: 'Find items'})
  @ApiResponse({ status: 200, description:'Success', type: Boolean})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  findAll() {
    return this.itemService.findAllItem();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Find one item'})
  @ApiResponse({ status: 200, description:'Success', type: Boolean})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  findOne(@Param('id') id: string) {
    return this.itemService.findOneItem(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update Item'})
  @ApiResponse({ status: 200, description:'Success', type: Boolean})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.updateItem(+id, updateItemDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete this piece of s*'})
  @ApiResponse({ status: 200, description:'Success', type: Boolean})
  @ApiResponse({status:400, description:'Bad Request'})
  @ApiResponse({status: 401, description: 'Unauthorized'})
  remove(@Param('id') id: string) {
    return this.itemService.deleteItem(+id);
  }
}
