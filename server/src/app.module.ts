import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { HealthController } from './health/health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { CandidateModule } from './modules/candidate/candidate.module';
import { InterviewModule } from './modules/interview/interview.module';
import { SeedService } from './seed/seed.service';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { PrismaService } from './prisma.service';

@Module({
  imports: [HealthModule, TerminusModule, CandidateModule, InterviewModule],
  controllers: [AppController, HealthController],
  providers: [AppService, SeedService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
