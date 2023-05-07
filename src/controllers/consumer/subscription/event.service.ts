import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EventDetailsDto } from 'src/dto/auth.request.dto';

import { MoiConsumerRequest } from 'src/middleware/verifyConsumerAuthToken.middleware';
import { UserContextService } from 'src/services/userContext.service';

@Injectable()
export class EventService {
  constructor(private _userContextService: UserContextService) {}

  // async checkForActiveSubscription(
  //   userId: string | mongoose.Schema.Types.ObjectId,
  //   throwException: boolean,
  // ) {
  //   const data = await this._subscriptionDb.find({
  //     userId: userId,
  //     status: StatusEnum.active,
  //   });

  //   if (data.length === 0 && throwException)
  //     throw new BadRequestException('No active subscription found');

  //   return data;
  // }

  async addEvent(
    eventDetailsDto: EventDetailsDto,
    request: MoiConsumerRequest,
  ) {
    const { name, date, city } = eventDetailsDto;
    const userData = {
      name,
      city,
      date,
    };
    const result = await this._userContextService.eventUpdate(
      request.user.userId,
      userData,
    );
    return result;
  }
}
