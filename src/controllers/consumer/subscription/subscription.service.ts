import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionEntity,
} from 'src/entity/subscription.entity';
import { StatusEnum } from 'src/enum/status.enum';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private _subscriptionDb: Model<SubscriptionEntity>,
  ) {}

  async checkForActiveSubscription(
    userId: string | mongoose.Schema.Types.ObjectId,
    throwException: boolean,
  ) {
    const data = await this._subscriptionDb.find({
      userId: userId,
      status: StatusEnum.active,
    });

    if (data.length === 0 && throwException)
      throw new BadRequestException('No active subscription found');

    return data;
  }
}
