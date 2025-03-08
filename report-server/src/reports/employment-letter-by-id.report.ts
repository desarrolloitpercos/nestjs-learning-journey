import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";
import { headerSection } from "./sections/header.section";


// Se genera esta interfaz para no hacer la conexión directa con la instancia de prisma
interface ReportValues {
    employerName: String;
    employerPosition: String;
    employeeName: String;
    employeePosition: String;
    employeeStartDate: Date;
    employeeHours: number;
    employeeWorkSchedule: String;
    employeeCompany: String;
}

const styles: StyleDictionary = {
    title: {
        fontSize: 22,
        bold: true,
        alignment: 'center',
        margin: [0, 50, 0, 20]
    },
    body: {
        alignment: 'justify',
        margin: [0, 30, 0, 70]
    },
    signature: {
        alignment: 'left'
    },
    footer: {
        fontSize: 10,
        alignment: 'center',
        italics: true,
        margin: [0, 0, 0, 20]
    }
};

// const logo: Content = {
//     image: 'src/assets/tucan-code-logo.png',
//     width: 100,
//     height: 100,
//     alignment: 'center',
//     margin: [0, 0, 0, 20]
// };

export const getEmploymentLetterByIdReport = (values: ReportValues ): TDocumentDefinitions => {

    const {
        employerName,
        employerPosition,
        employeeName,
        employeePosition,
        employeeStartDate,
        employeeHours,
        employeeWorkSchedule,
        employeeCompany,
    } = values;

    const docDefinition: TDocumentDefinitions = {
        styles: styles,
        pageMargins: [40, 60, 40, 60],

        // header: {
        //     columns: [
        //         logo,
        //         {
        //             text: DateFormatter.getDDMMMMYYYY(new Date()),
        //             alignment: 'right',
        //             margin: [20, 20]
        //         }
        //     ]
        // },


        header: headerSection({
            showDate: true,
            showLogo: true,
            title: 'CONSTANCIA DE EMPLEO'
        }),

        content: [{
            text: 'CONSTANCIA DE EMPLEO',
            style: 'title',
        },
        {
            text: `Yo, ${ employerName }, en mi calidad de ${ employerPosition } de ${ employeeCompany },
                    por medio de la presente certifico que ${ employeeName } ha sido empleado en nuestra
                    empresa desde el ${ DateFormatter.getDDMMMMYYYY(employeeStartDate) }.\n
                    Durante su empleo, el Sr./Sra. ${ employeeName } ha desempeñado el cargo de [Cargo del
                    Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus
                    labores.\n
                    La jornada laboral del Sr./ Sra. ${ employeeName } es de ${ employeeHours } horas
                    semanales, con un horario de ${ employeeWorkSchedule }, cumpliendo con las políticas y
                    procedimientos establecidos por la empresa.\n 
                    Esta constancia se expide a solicitud del interesado para los fines que considere conveniente`,
            style: 'body'
        },
        {
            text: `Atentamente,\n ${ employerName } \n ${ employerPosition }  \n ${ employeeCompany } \n  ${ DateFormatter.getDDMMMMYYYY(new Date) }`,
            style: 'signature'
        }
        ],
        footer: {
            text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`,
            style: 'footer'
        }
    };

    return docDefinition;
}