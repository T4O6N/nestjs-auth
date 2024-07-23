import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: UserDto) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    return await this.prisma.user.create({
      data: {
        ...userData,
        password: hashPassword,
      },
    });
  }

  async getUsers() {
    return await this.prisma.user.findMany({
      orderBy: {
        create_at: 'asc',
      },
    });
  }

  async getOne(userId: string) {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    await this.getOne(userId);

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async removeUser(userId: string) {
    await this.getOne(userId);

    return await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
