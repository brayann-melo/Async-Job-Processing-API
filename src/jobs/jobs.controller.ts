import { Controller, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('send')
  async sendEmail() {
    await this.jobsService.sendEmailJob();
    return { message: 'Email job sent to queue!' };
  }
}
