import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity/user.entity';
import { VerifyConsumerAuthTokenMiddleware } from 'src/middleware/verifyConsumerAuthToken.middleware';
import { ConsumerAuthController } from './auth/consumerAuth.controller';
import { ConsumerAuthService } from './auth/consumerAuth.service';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionController } from './subscription/subscription.controller';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/entity/subscription.entity';
import {
  CommonPassword,
  CommonPasswordSchema,
} from 'src/entity/commonPassword.entity';
import { UserContextController } from './userContext/userContext.controller';
import { UserContextService } from './userContext/userContext.service';
import { CommonPasswordService } from 'src/services/shared/commonPassword.service';
import { UserService } from 'src/services/user.service';
import { UserContext, UserContextSchema } from 'src/entity/userContext.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: CommonPassword.name, schema: CommonPasswordSchema },
      { name: UserContext.name, schema: UserContextSchema },
    ]),
  ],
  controllers: [
    ConsumerAuthController,
    SubscriptionController,
    UserContextController,
  ],
  providers: [
    ConsumerAuthService,
    SubscriptionService,
    UserContextService,
    CommonPasswordService,
    UserService,
  ],
})
export class ConsumerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyConsumerAuthTokenMiddleware)
      // .exclude(
      //   'api/consumer/auth/(.*)',
      //   'api/consumer/auth2/(.*)',
      //   'api/consumer/unit/getByBlockId/(.*)',
      //   'api/consumer/customer/(.*)',
      // )
      .forRoutes('/consumer');
  }
}
