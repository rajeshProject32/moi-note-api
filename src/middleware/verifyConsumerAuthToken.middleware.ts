import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { Response, NextFunction } from 'express';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { StatusEnum } from 'src/enum/status.enum';
import { User, UserEntity } from 'src/entity/user.entity';
import { Model } from 'mongoose';
import { SubscriptionService } from 'src/controllers/consumer/subscription/subscription.service';

@Injectable()
export class VerifyConsumerAuthTokenMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private _userDb: Model<UserEntity>,
    private _subscriptionService: SubscriptionService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const urls = ['consumer/auth', 'consumer/forgotPwd'];
    const url = (request as any).originalUrl;
    if (url.includes(urls[0])) {
      next();
      return;
    }
    const jwtTokenKey = process.env.JWT_SECRET;
    const token = request.headers['authorization'];
    if (!token || !jwtTokenKey) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new GlobalResponseDto(
            HttpStatus.UNAUTHORIZED,
            'Token is required',
            null,
            [],
          ),
        );
    } else if (jwt.verify(token, jwtTokenKey)) {
      const customerid = request.headers['customerid'];
      if (!customerid) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(
            new GlobalResponseDto(
              HttpStatus.BAD_REQUEST,
              'Mandatory headers are missing',
              null,
              [],
            ),
          );
      }
      const decoded: any = jwtDecode(token);
      if (decoded.user) {
        request['user'] = decoded.user;
        request['user'].userId = decoded.user._id;
        if (customerid) {
          const userCustomerInfoData = await this._userDb.findOne({
            _id: decoded.user._id,
          });

          if (
            !userCustomerInfoData ||
            userCustomerInfoData.status !== StatusEnum.active
          ) {
            return response
              .status(HttpStatus.UNAUTHORIZED)
              .json(
                new GlobalResponseDto(
                  HttpStatus.UNAUTHORIZED,
                  'User not active',
                  null,
                  [],
                ),
              );
          }

          await this._subscriptionService.checkForActiveSubscription(
            userCustomerInfoData._id,
            true,
          );
          next();
          return;
        }
      }
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new GlobalResponseDto(
            HttpStatus.UNAUTHORIZED,
            'Invalid Token, please login again',
            null,
            [],
          ),
        );
    } else {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new GlobalResponseDto(
            HttpStatus.UNAUTHORIZED,
            'Login expired, please login again',
            null,
            [],
          ),
        );
    }
  }
}
