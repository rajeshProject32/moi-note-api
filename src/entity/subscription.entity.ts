import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseEntity } from './common/base.entity';
import { StatusEnum } from 'src/enum/status.enum';

export type SubscriptionEntity = Subscription & Document;

@Schema({ collection: 'subscriptions', timestamps: true })
export class Subscription extends BaseEntity {
  @Prop({ ref: 'CustomerPackage' })
  customerPackageId: mongoose.Schema.Types.ObjectId;

  @Prop({ index: true })
  customerId: mongoose.Schema.Types.ObjectId;

  @Prop({ index: true })
  userCustomerInfoId: mongoose.Schema.Types.ObjectId;

  @Prop({ index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    default: StatusEnum.active,
    enum: [StatusEnum.active, StatusEnum.expired, StatusEnum.cancelled],
  })
  status: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  paymentId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: 0 })
  floorPrice: number;

  @Prop({ default: 0 })
  consumerPrice: number;

  @Prop({ default: 0 })
  customerPrice: number;

  @Prop({ default: 0 })
  partnerSharePercentage: number;

  @Prop({ default: 0 })
  customerSharePercentage: number;
}
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
