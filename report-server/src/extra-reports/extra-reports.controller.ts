import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportsService } from './extra-reports.service';
import { Response } from 'express';

@Controller('extra-reports')
export class ExtraReportsController {
  constructor(private readonly extraReportsService: ExtraReportsService) {}

  @Get('html-report')
  async getHtmlReport(@Res() response: Response){
    const pdfDoc = await this.extraReportsService.getHtmlReport();

    response.setHeader('Contet-Type', 'application/pdf');
    pdfDoc.info.Title = 'Html to Pdf'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-report')
  async getCustomReport(@Res() response: Response){
    const pdfDoc = await this.extraReportsService.getCustomReport();

    response.setHeader('Contet-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom report'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('custom-size')
  async getCustomSizeReport(@Res() response: Response){
    const pdfDoc = await this.extraReportsService.getCustomSizeReport();

    response.setHeader('Contet-Type', 'application/pdf');
    pdfDoc.info.Title = 'Custom report'
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
