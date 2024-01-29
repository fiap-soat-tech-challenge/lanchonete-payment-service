import { Controller, Get, Req } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request } from 'express';

@ApiExcludeController()
@Controller('/')
export class HomeController {
  @Get()
  home(@Req() request: Request): object {
    return {
      message: 'Bem-vindo ao Payment Service Lanchonete!',
      docs: `${request.protocol}://${request.get('Host')}${
        request.originalUrl
      }api/pagamentos/docs`,
    };
  }
}
