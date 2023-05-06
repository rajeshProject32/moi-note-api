/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './common/base.entity';
import * as mongoose from 'mongoose';
import { StatusEnum } from 'src/enum/status.enum';

export type UserContextEntity = UserContext & Document;

@Schema({ collection: 'usercontexts', timestamps: true })
export class UserContext extends BaseEntity {
  @Prop({ index: true })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ index: true })
  userCustomerInfoId: mongoose.Schema.Types.ObjectId;

  @Prop({ default: [] })
  featureIdCodes: string[];

  @Prop({ default: StatusEnum.notVerified })
  status: string;

  @Prop({
    type: Object,
    default: {
      isSigned: false,
    },
  })
  creditAgreement: {
    isSigned: boolean;
    signedDate: Date;
  };
}

export const UserContextSchema = SchemaFactory.createForClass(UserContext);
