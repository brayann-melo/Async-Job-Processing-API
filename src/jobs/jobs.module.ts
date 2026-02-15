import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JobsService } from './jobs.service';
import { EmailProcessor } from './email.processor/email.processor';
import { JobsController } from './jobs.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [JobsController],
  providers: [JobsService, EmailProcessor],
})
export class JobsModule {}
