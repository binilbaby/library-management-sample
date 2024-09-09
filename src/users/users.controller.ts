
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users') // Grouping the endpoints under "Users" in Swagger
@ApiBearerAuth() // Adds JWT Bearer Authentication requirement to this controller
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user (Librarian, Staff, Student)' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':role')
  @ApiOperation({ summary: 'Get all users by role (Librarian, Staff, Student)' })
  @ApiResponse({ status: 200, description: 'List of users by role.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getUsersByRole(@Param('role') role: string) {
    return this.usersService.getUsersByRole(role);
  }
}

