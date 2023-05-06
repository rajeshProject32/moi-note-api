import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private _subscriptionService: SubscriptionService) {}

  //   @Get('listOfAllPackages') async listOfAllPackages(
  //     @Req() request: GodomoConsumerRequest,
  //     @Res() response: Response,
  //   ) {
  //     const result =
  //       await this._subscriptionService.getActiveSubscriptionsWithPopulate(
  //         request.user.userCustomerInfoId,
  //       );
  //     return response
  //       .status(HttpStatus.OK)
  //       .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  //   }
}
