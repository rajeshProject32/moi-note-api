import { AppModule } from './app.module';
import helmet from 'helmet';
import { config } from './config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExceptionsFilter } from './filters/exceptions.filters';
import { ConfigService } from './services/shared/config.service';

async function bootstrap() {
  ConfigService.setEnvironment(
    config.ENVIRONMENT,
    config.LOG_GROUP_NAME,
    config.LOG_STREAM_NAME,
  );
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use((req, res, next) => {
    // LogService.logInformation(req.originalUrl, 'main.ts', 'cors');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));
  await app.listen(process.env.PORT || 443, () => {
    console.log(
      `server listening on: ${process.env.PORT || 443} ${
        process.env.ENVIRONMENT
      }`,
    );
  });
}
bootstrap();
