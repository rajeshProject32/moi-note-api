import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { MoiConsumerRequest } from 'src/middleware/verifyConsumerAuthToken.middleware';
import { EventDetailsDto } from 'src/dto/auth.request.dto';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private _subscriptionService: EventService) {}

  @Post('addEvent')
  async addEvent(
    @Req() request: MoiConsumerRequest,
    @Res() response: Response,
    @Body() eventDetailsDto: EventDetailsDto,
  ) {
    // validate input
    // await AuthValidator.validateSignup(signupRequestDto);
    const msg = await this._subscriptionService.addEvent(
      eventDetailsDto,
      request,
    );

    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', msg, []));
  }
}
