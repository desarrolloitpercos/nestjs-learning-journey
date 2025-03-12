import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { PrinterService } from 'src/printer/printer.service';
import { getStoreInvoiceReport } from 'src/reports/index';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {

    async onModuleInit() {
        await this.$connect();
    }

    constructor(
        private readonly printerService: PrinterService) {
        super();
    }

    async getOrderByIdReport(orderId: number) {

        const order = await this.orders.findUnique({
            where: {
                order_id: orderId,
            },
            include: {
                customers: true,
                order_details: {
                    include: {
                        products: true,
                    }
                },
            }
        });

        console.log(JSON.stringify(order));
        if (  !order ) throw new NotFoundException(`Order with id ${orderId} not found`);

        const docDefinition = getStoreInvoiceReport({data: order as any});            

        const doc = this.printerService.createPdf(docDefinition);

        return doc;
    }

}
