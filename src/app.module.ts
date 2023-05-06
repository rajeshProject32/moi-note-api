import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerModule } from './controllers/consumer/consumer.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://baranimugi:Barani03mugi@cluster0.6pza3sg.mongodb.net/moi',
    ),
    // MongooseModule.forRootAsync({
    //   useFactory: async () => {
    //     const connection = ConnectToMongodb.getConnectionString();
    //     return {
    //       connectionFactory: (connection) => {
    //         if (connection.readyState === 1) {
    //           console.log('Database Connected successfully');
    //         }
    //         connection.on('disconnected', () => {
    //           console.log('Database disconnected');
    //         });
    //         connection.on('error', (error) => {
    //           console.log('Database connection failed! for error: ', error);
    //         });

    //         return connection;
    //       },
    //       uri: connection,
    //     };
    //   },
    // }),
    ConsumerModule,
    RouterModule.register([
      {
        path: 'consumer',
        module: ConsumerModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
