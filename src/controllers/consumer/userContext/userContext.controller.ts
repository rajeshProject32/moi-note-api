import {
  Controller,
  Res,
  HttpStatus,
  Get,
  Req,
  Body,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { UserContextService } from 'src/services/userContext.service';

@Controller('userContext')
export class UserContextController {
  constructor(private _userContextService: UserContextService) {}

  @Get('')
  async getUserContext(
    @Res() response: Response,
    // @Req() request: GodomoConsumerRequest,
  ) {
    // const data = await this._userContextService.upsertUserContext(
    //   request.user.userId,
    //   request.user.userCustomerInfoId,
    // );
    // return response
    //   .status(HttpStatus.OK)
    //   .json(new GlobalResponseDto(200, '', data, []));
  }
}
