import { ValidationParamsPipe } from '@/common/pipes/validation-params.pipe';
import { UserEntity } from '@/infra/typeorm/entities/user-entity/user.entity';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserDto } from '../dtos/add-user/add-user.dto';
import { AddUserService } from '../services/add-user/add-user.service';
import { LoadUserByEmailService } from '../services/load-user-by-email/load-user-by-email.service';
import { LoadUserByIdService } from '../services/load-user-by-id/load-user-by-id.service';
import { LoadUserByNameService } from '../services/load-user-by-name/load-user-by-name.service';
import { UserInput } from '../types/user-input/user-input.type';
import { UserOutputType } from '../types/user-output/user-output.type';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly addUserService: AddUserService,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly loadUserByIdService: LoadUserByIdService,
    private readonly loadUserByNameService: LoadUserByNameService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add new user.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'e-mail past request is already in use.',
  })
  public async add(@Body() addUserDto: AddUserDto): Promise<UserEntity> {
    return await this.addUserService.addUser(addUserDto);
  }

  @Get('load-user-by-email')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'load user by e-mail.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'e-mail past request is already in use.',
  })
  public async loadByEmail(
    @Query(ValidationParamsPipe) userInput: UserInput,
  ): Promise<UserOutputType> {
    return await this.loadUserByEmailService.loadEmailIsNotFound(
      userInput.email,
    );
  }

  @Get('load-user-by-name/:name')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'load user by name.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'name past request is already in use.',
  })
  public async loadByName(
    @Param(ValidationParamsPipe) userInput: UserInput,
  ): Promise<UserOutputType> {
    return await this.loadUserByNameService.loadUserByName(userInput.name);
  }

  @Get('load-user-by-id/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'load user by id.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found.',
  })
  public async loadById(
    @Param(ValidationParamsPipe) userInput: UserInput,
  ): Promise<UserOutputType> {
    return await this.loadUserByIdService.loadById(userInput.id);
  }
}
