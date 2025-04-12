import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithStatsDto } from './dto/user-with-items.dto';
@Injectable()
export class UserService {
constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const {items, ...userData} = data;
    try {

      if( data.strength + data.defense <= 10 ) {
        return this.prisma.user.create({ 
          data: {
            ...userData,
            ...(items?.length? { items: { create: items} } : {}),
          },
          include: {
            items: true,
          },
        })
      } else {
        throw new Error('You have only 10 points to put in strength and defense...')
      }
    } catch(error) {
    throw new Error(`Error in create a user: ${error.message}`);
    }
  } 

  async findAllUser(): Promise<UserWithStatsDto[]> {
    try {
      const allusers: any[] = await this.prisma.user.findMany({
        include: {
          items: true,
        }
      });
  
      const usersWithStats = allusers.map((user: any) => {
      const totalItemDefense = user.items?.reduce((sum, item) => sum + (item.defense || 0), 0) || 0;
      const totalItemStrength = user.items?.reduce((sum, item) => sum + (item.strength || 0), 0) || 0;
      
      return {
        ...user,
        totalDefense: user.defense + totalItemDefense,
        totalStrength: user.strength + totalItemStrength,
      };
    });

    return usersWithStats;
    } catch (error) {
      throw new Error("Error in search all users");
    }
  }

  async findOneUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: { items: true }
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      const totalDefense = user.items.reduce((sum, item) => sum + (item.defense || 0), 0);
      const totalStrength = user.items.reduce((sum, item) => sum + (item.strength || 0), 0);

      return { user,
        totalDefense: user.defense + totalDefense,
        totalStrength: user.strength + totalStrength,
        message: `User #${id}` }

    } catch(error) {
      console.error(error);
      throw new NotFoundException();
    }
    
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { items, ...userData } = updateUserDto;
  
      const updateUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          ...(items?.length ? { items: { create: items } } : {}), },
        include: { items: true },

      });

      return { updateUser, message: `User #${id} updated` };
    } catch (error) {
      console.error(error);
      throw new NotFoundException();
    }
  }
 
  async deleteUser(id: number) {
    try {
      const delUser = await this.prisma.user.delete({
        where: { id }
      });

      return { delUser, message: `This action removes a #${id} user`}
    } catch(error) {
      console.error(error);
      throw new NotFoundException();
    }
  } 
}
