import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";
import { headerSection } from "./sections/header.section";

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

export const getEmploymentLetterReport = (): TDocumentDefinitions => {

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
            text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa],
                    por medio de la presente certifico que [Nombre del Empleado] ha sido empleado en nuestra
                    empresa desde el [Fecha de Inicio del Empleado].\n
                    Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del
                    Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus
                    labores.\n
                    La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas
                    semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y
                    procedimientos establecidos por la empresa.\n 
                    Esta constancia se expide a solicitud del interesado para los fines que considere conveniente`,
            style: 'body'
        },
        {
            text: `Atentamente,\n [Nombre del Empleador] \n [Cargo del Empleador] \n [Nombre de la Empresa] \n  [Fecha de Emisión]`,
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