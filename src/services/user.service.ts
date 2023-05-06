import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserEntity } from 'src/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private _userDb: Model<UserEntity>,
  ) {}

  async usernameCheck(username) {
    const existedUsername = await this._userDb.findOne({ username }).exec();
    if (existedUsername) {
      throw new BadRequestException(
        'Username is already existing, please enter a unique username',
      );
    }
  }
}