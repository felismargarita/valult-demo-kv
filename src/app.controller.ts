import { Controller, Body, Post, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/object')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  upsert(@Body() body: any) {
    return this.appService.upsert(body);
  }

  @Get('/:key')
  query(
    @Param('key') key: string,
    @Query('timestamp') timestamp?: number | string,
  ) {
    return this.appService.query(key, timestamp ? Number(timestamp) : null);
  }
}
