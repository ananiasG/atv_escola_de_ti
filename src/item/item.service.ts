import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createItem(data: CreateItemDto): Promise<Item> {
    try {
      if (data.type === 'AMULET') {
        const existingAmulet = await this.prisma.item.findFirst({
          where: {
            idUser: data.idUser,
            type: 'AMULET',
          },
        });
        if (existingAmulet) {
          throw new BadRequestException('User can have one amulet...');
        }
      }
      if(data.type === 'WEAPON' && data.defense >= 0 && data.strength === 0)
        throw new Error('Weapon items cannot have defense or zero strength...');
      if(data.type === 'ARMOR' && data.strength >= 0 && data.defense === 0)
        throw new Error('Armor items cannot have strength or zero defense...');
      if(data.type === 'AMULET' && data.strength === 0 && data.defense === 0)
        throw new Error('Amulet items cannot have zero of defense and strength...');
      return this.prisma.item.create({
        data: {
          name: data.name,
          type: data.type,
          strength: data.strength,
          defense: data.defense,
          user: {
            connect: { id: data.idUser },
          },
        }
      })
    } catch(error) {
      throw new Error(`Error in create a user: ${error.message}`);
    } 
  }

  async findAllItem() {
    try {
      return this.prisma.item.findMany()
    } catch(error) {
      throw new Error("Error in search all items");
    } 
  }

  async findOneItem(id: number) {
    try {
      return await this.prisma.item.findUnique({ 
        where: {id}});
    } catch(error) {
      throw new Error('Item not found');
    }
    
  }

  updateItem(id: number, data: UpdateItemDto) {
    try {
      if(data.type === 'WEAPON' && data.defense >= 0 && data.strength === 0)
        throw new Error('Weapon items cannot have defense or zero strength...');
      if(data.type === 'ARMOR' && data.strength >= 0 && data.defense === 0)
        throw new Error('Armor items cannot have strength or zero defense...');
      if(data.type === 'AMULET' && data.strength === 0 && data.defense === 0)
        throw new Error('Amulet items cannot have zero of defense and strength...');
      return this.prisma.item.update({
        where: { id },
        data: {
          name: data.name,
          type: data.type ?? undefined,
          strength: data.strength ?? undefined,
          defense: data.defense ?? undefined,
          user: {
            connect: { id: data.idUser },
          },
        },
      });
    } catch (error) {
      throw new Error(`Error updating item: ${error.message}`);
    }
  }

  deleteItem(id: number) {
    try {
      const item = this.prisma.item.findUnique({
        where: { id },
      });

      if (!item) {
        throw new Error(`Item with id ${id} not found`);
      }

      return this.prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting item: ${error.message}`);
    }
  }
}

