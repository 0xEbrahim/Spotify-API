import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DevConfigService } from './common/providers/DevConfigService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly devConfigService: DevConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.devConfigService.getDBHOST();
  }
}
