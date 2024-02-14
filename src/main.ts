import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { RestExceptionFilter } from './infra/apis/rest/exceptions/rest-exception.filter';
import { configureQueueConsumers } from './app.consumers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new RestExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Payment Service Lanchonete')
    .setDescription('Esta API expõe endpoints responsáveis pelos pagamentos.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/pagamentos/docs', app, document);

  // await configureQueueConsumers(app);
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
