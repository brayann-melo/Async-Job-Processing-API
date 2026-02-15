import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class JobsService {
  constructor(
    @InjectQueue('email-queue') private emailQueue: Queue,
  ) {}

  async sendEmailJob() {
    await this.emailQueue.add('send-email', {
      to: 'teste@email.com',
      subject: 'Teste',
    });

    console.log('🟢 Request received. The email will be processed shortly.');
  }
}

