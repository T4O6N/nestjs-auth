import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();
async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);

  console.log(
    ` ################################################################ \n  * 🚀 Application is running on: http://127.0.0.1:${process.env.PORT}/api 🚀 *\n ################################################################\n`,
  );
}
main();
