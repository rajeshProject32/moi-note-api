import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserEntity } from 'src/entity/user.entity';
import { Model } from 'mongoose';
import { StatusEnum } from 'src/enum/status.enum';
import { SignupRequestDto } from 'src/dto/auth.request.dto';
import { SubscriptionService } from '../subscription/subscription.service';
import { UserService } from 'src/services/user.service';
import { CommonPasswordService } from 'src/services/shared/commonPassword.service';
import * as bcrypt from 'bcrypt';
import { UserContextService } from '../userContext/userContext.service';

@Injectable()
export class ConsumerAuthService {
  constructor(
    @InjectModel(User.name)
    private _userDb: Model<UserEntity>,
    private _subscriptionService: SubscriptionService,
    private _userService: UserService,
    private _commonPasswordService: CommonPasswordService,
    private _userContextService: UserContextService,
  ) {}
  saltRounds = 10;
  async login() {
    return;
  }

  async signup(signupRequestDto: SignupRequestDto) {
    const { username, password, firstName, lastName, termsAndCondChecked } =
      signupRequestDto;

    await this._userService.usernameCheck(username);
    await this._commonPasswordService.commonPasswordCheck(password);
    const result = await new this._userDb({
      username,
      password: bcrypt.hashSync(password, this.saltRounds),
      firstName,
      lastName,
      termsAndCondChecked,
      status: 'Active',
    }).save();
    // await this._userContextService.updateStatus(userId, StatusEnum.active);
    return result;
  }
}
