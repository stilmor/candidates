import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Simple health check' })
  @ApiOkResponse({ description: 'OK – Service is healthy' })
  check() {
    // no indicators passed: always returns status "ok"
    return this.health.check([]);
  }
}
