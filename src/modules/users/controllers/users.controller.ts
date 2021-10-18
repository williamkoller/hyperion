import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '../dtos/add-user/add-user.dto';
import { AddUserService } from '../services/add-user/add-user.service';
import { LoadUserByEmailService } from '../services/load-user-by-email/load-user-by-email.service';
import { UserInput } from '../types/user-input/user-input.type';
import { UserOutputType } from '../types/user-output/user-output.type';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly loadUserByEmailService: LoadUserByEmailService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'e-mail past request is already in use',
  })
  public async add(@Body() addUserDto: AddUserDto): Promise<UserEntity> {
    return await this.addUserService.addUser(addUserDto);
  }

  @Get('load-user-by-email/:email')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'e-mail past request is already in use',
  })
  public async loadByEmail(
    @Param(ValidationParamsPipe) userInput: UserInput,
  ): Promise<UserOutputType> {
    return await this.loadUserByEmailService.loadEmailIsNotFound(
      userInput.email,
    );
  }
}
