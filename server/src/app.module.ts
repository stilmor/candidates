import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { CandidateModule } from './modules/candidate/candidate.module';

@Module({
  imports: [HealthModule, TerminusModule, CandidateModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
