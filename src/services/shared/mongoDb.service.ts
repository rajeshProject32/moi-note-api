/* eslint-disable @typescript-eslint/no-var-requires */
// import * as AWS from 'aws-sdk';
// import { EnvironmentConfigEnum } from 'src/enum/environmentConfig.enum';
// import { ConfigService } from './config.service';

export class ConnectToMongodb {
  static getConnectionString() {
    return 'mongodb+srv://baranimugi:Barani03mugi@cluster0.6pza3sg.mongodb.net/test';
    // return new Promise((resolve) => {
    //   const awsSecretsClient = new AWS.SecretsManager({
    //     region: EnvironmentConfigEnum[0].REGION,
    //     accessKeyId: EnvironmentConfigEnum[0].ACCESS_KEY_ID,
    //     secretAccessKey: EnvironmentConfigEnum[0].SECRET_ACCESS_KEY,
    //   });
    //   awsSecretsClient.getSecretValue(
    //     { SecretId: ConfigService.getConfig().dbUri },
    //     (err, data) => {
    //       resolve(data.SecretString);
    //     },
    //   );
    // });
  }
}
