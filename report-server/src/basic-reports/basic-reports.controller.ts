import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(@Res() response: Response){
    const pdfDoc = this.basicReportsService.hello();

    response.setHeader('Contet-Type', 'application/pdf');
    pdfDoc.pipe(response);
    pdfDoc.end();
    
  }
}
