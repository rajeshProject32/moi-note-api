import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserEntity } from 'src/entity/user.entity';
import { Model } from 'mongoose';
import { StatusEnum } from 'src/enum/status.enum';
import { AuthRequestDto, SignupRequestDto } from 'src/dto/auth.request.dto';
import { UserService } from 'src/services/user.service';
import { CommonPasswordService } from 'src/services/shared/commonPassword.service';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { jwtSecretKey } from 'src/config';
import { UserContextService } from 'src/services/userContext.service';

@Injectable()
export class ConsumerAuthService {
  constructor(
    @InjectModel(User.name)
    private _userDb: Model<UserEntity>,
    private _userService: UserService,
    private _commonPasswordService: CommonPasswordService,
    private _userContextService: UserContextService,
  ) {}
  saltRounds = 10;
  async login(authRequestDto: AuthRequestDto) {
    const { username, password } = authRequestDto;
    const findUser = await this._userDb.findOne({ username });
    const userContextId = await this._userContextService.getUserContext(
      findUser._id,
    );
    const userData = {
      findUser,
      userContextId: userContextId._id,
    };
    if (!bcrypt.compareSync(password, findUser.password) || !findUser) {
      throw new BadRequestException(
        'Please enter a valid Member ID and Password',
      );
    }
    return this.generateToken(userData);
  }

  async signup(signupRequestDto: SignupRequestDto) {
    const {
      username,
      password,
      firstName,
      lastName,
      termsAndCondChecked,
      addressline1,
      addressline2,
      city,
      postalCode,
      accessType,
    } = signupRequestDto;

    await this._userService.usernameCheck(username);
    await this._commonPasswordService.commonPasswordCheck(password);
    const result = await new this._userDb({
      username,
      password: bcrypt.hashSync(password, this.saltRounds),
      firstName,
      lastName,
      'address.addressline1': addressline1,
      'address.addressline2': addressline2,
      'address.city': city,
      'address.postalCode': postalCode,
      termsAndCondChecked,
      status: 'Active',
      accessType,
    }).save();
    const userId = result._id;
    await this._userContextService.updateStatus(userId, {
      status: StatusEnum.active,
    });
    return result;
  }

  async generateToken(userData) {
    const jwtSecret = jwtSecretKey.secretKey;
    const token = jsonwebtoken.sign({ user: userData }, jwtSecret);
    const sendToken = {
      access_token: token,
      token_type: 'Bearer',
    };
    return sendToken;
  }
}
