import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport, getEmploymentLetterReport, getEmploymentLetterByIdReport } from 'src/reports/index';

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

  employmentLetter(){

    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  // Por tener una conexion a db se agrega async y await durante la consulta de informacion
  async employmentLetterById(employeeId: number){

    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      }
    });

    // Validacion en caso de no encontrar el id
    if ( !employee ){
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Diana Garzón',
      employerPosition: 'Gerente de Desarro',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employeeCompany: 'Tucan Code Corp.',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

}
