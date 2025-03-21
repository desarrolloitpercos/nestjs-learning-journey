import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getCustomContent } from 'src/reports';
import { getHtmlContent } from 'src/helpers';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from 'src/reports/sections/header.section';
import { Certificate } from 'crypto';

@Injectable()
export class ExtraReportsService {

    constructor(
        private readonly printerService: PrinterService) {
    }

    async getHtmlReport() {

        const html = fs.readFileSync('src/reports/html/basic-02.html', 'utf8');

        const content = getHtmlContent(html, {
            client: 'Usuario 1'
        });

        const docDefinition: TDocumentDefinitions = {
            pageMargins: [40, 110, 40, 60],
            header: headerSection({
                title: 'Html to Pdfmake',
                subTitle: 'Convertir HTML a PDFMake'
            }),
            content: content,
        };

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

    async getCustomReport() {

        const docDefinition = getCustomContent();

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }
    
    async getCustomSizeReport() {
       

        const doc = this.printerService.createPdf({
            pageSize: {
                width: 150,
                height: 300,
            },
            content: [
                {
                    qr: 'www.laboratorioslegrand.com',
                    fit: 101,
                    alignment:'center',
                },{
                    text: 'Reporte con tamaño',
                    fontSize: 10,
                    alignment: 'center',
                    margin: [0, 20]
                }
            ]
        });

        return doc;
    }
}
