import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports/hello-world.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit{

  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database')
  }

  constructor(
    private readonly printerService:PrinterService){
    super();
  }


  hello(){

    const docDefinition = getHelloWorldReport({name: "CharliOni"});

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

}
