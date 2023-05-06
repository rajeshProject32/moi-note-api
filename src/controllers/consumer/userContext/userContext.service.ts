import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UserContext, UserContextEntity } from 'src/entity/userContext.entity';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class UserContextService {
  constructor(
    @InjectModel(UserContext.name)
    private _userContextDb: Model<UserContextEntity>,
    private _subscriptionService: SubscriptionService,
  ) {}

  async getUserContext(userId: Schema.Types.ObjectId) {
    return await this._userContextDb.findOne({ userId });
  }

  async updateStatus(userId: Schema.Types.ObjectId, status: string) {
    await this._userContextDb.updateOne({ userId }, { $set: { status } });
  }
}
