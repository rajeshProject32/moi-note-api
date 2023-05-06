/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusEnum } from 'src/enum/status.enum';
import { BaseEntity } from './common/base.entity';

export type UserEntity = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User extends BaseEntity {
  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ sparse: true })
  username: string;

  @Prop({ sparse: true })
  password: string;

  @Prop()
  termsAndCondChecked: boolean;

  @Prop({ default: StatusEnum.active })
  status: string;

  // @Prop()
  // lastPwdChangedDate: Date;

  // @Prop({ default: '' })
  // city: string;

  // @Prop({ default: null })
  // avatar: string;

  // @Prop({ default: '' })
  // gender: string;

  // @Prop({ default: null })
  // lastlogin: Date;

  // @Prop({ default: false })
  // isGenericCode: boolean;

  // @Prop({ type: Object })
  // mfaVerificationDetails: {
  //   phoneNumber: string;
  //   phoneNumberVerifiedDate: Date;
  // };
}

export const UserSchema = SchemaFactory.createForClass(User);
