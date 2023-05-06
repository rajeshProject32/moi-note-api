import {
  Controller,
  HttpStatus,
  Res,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { ConsumerAuthService } from './consumerAuth.service';
import { SignupRequestDto } from 'src/dto/auth.request.dto';
import { AuthValidator } from 'src/validator/auth.validator';

@Controller('auth')
export class ConsumerAuthController {
  constructor(private _consumerAuthService: ConsumerAuthService) {}

  @Post('login')
  async login(@Res() response: Response) {
    // validate auth login

    const token = await this._consumerAuthService.login();

    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', token, []));
  }

  @Post('signUp')
  async signUp(
    @Res() response: Response,
    @Body() signupRequestDto: SignupRequestDto,
  ) {
    // validate input
    await AuthValidator.validateSignup(signupRequestDto);
    const msg = await this._consumerAuthService.signup(signupRequestDto);

    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', msg, []));
  }
}
