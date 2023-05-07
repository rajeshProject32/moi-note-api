import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity/user.entity';
import { VerifyConsumerAuthTokenMiddleware } from 'src/middleware/verifyConsumerAuthToken.middleware';
import { ConsumerAuthController } from './auth/consumerAuth.controller';
import { ConsumerAuthService } from './auth/consumerAuth.service';
import { EventService } from './subscription/event.service';
import { EventController } from './subscription/event.controller';
import {
  Subscription,
  SubscriptionSchema,
} from 'src/entity/subscription.entity';
import {
  CommonPassword,
  CommonPasswordSchema,
} from 'src/entity/commonPassword.entity';
import { UserContextController } from './userContext/userContext.controller';
import { CommonPasswordService } from 'src/services/shared/commonPassword.service';
import { UserService } from 'src/services/user.service';
import { UserContext, UserContextSchema } from 'src/entity/userContext.entity';
import { UserContextService } from 'src/services/userContext.service';

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
  controllers: [ConsumerAuthController, EventController, UserContextController],
  providers: [
    ConsumerAuthService,
    EventService,
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
