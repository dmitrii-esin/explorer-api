import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

//TODO: If we want to bind middleware to every registered route at once,
// we can use the use() method that is supplied by the INestApplication instance:
// const app = await NestFactory.create(AppModule);
// app.use(logger);
// await app.listen(3000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Explorer Api')
    .setDescription('The Explorer Api description')
    .setVersion('1.0')
    .addTag('explorer-api')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
