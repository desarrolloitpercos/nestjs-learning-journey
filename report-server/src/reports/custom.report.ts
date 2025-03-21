import { TDocumentDefinitions } from "pdfmake/interfaces";

export const getCustomContent = (): TDocumentDefinitions => {

    const docDefinition: TDocumentDefinitions = {
        defaultStyle: {
            fontSize: 12,
        },
        content: [
            {
                columns: [
                    {
                        image: 'src/assets/tucan-code-logo.png',
                        width: 50,
                    }, {
                        alignment: 'center',
                        text: 'Forest Admin Comunity SAP\n RUT: 44,12565,25858\n Camino montaña km 4\n Teléfono: 335.985.6511'
                    },{
                        alignment: 'right',
                        width: 140,
                        layout: 'boderBlue',
                        table: {
                            body: [
                                [
                                    {
                                        layout: 'noBorders',
                                        table:{
                                            body:[
                                                ['No.', '123-456'],
                                                ['Fecha', '2025-03-21'],
                                                ['Versión', '2025-003']
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },

            // Horizontal Line
            {
                margin: [0,5],
                canvas: [
                    {
                        type: 'line',
                        x1: 0,
                        y1: 5,
                        x2: 515,
                        y2:5,
                        lineWidth: 1,
                        lineColor: '#3A4546'
                    }
                ]
            },

            // Detalles del cliente
            {
                table:{
                    widths: ['auto', '*', 'auto', '*'],
                    body: [
                        [
                            {
                                text: 'Datos del cliente',
                                fillColor: '#5775e1',
                                color: 'white',
                                colSpan: 4
                            },{},{},{}
                        ],
                        [
                            {
                                text: 'Razón social',
                                fillColor:'#3A4546',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Nombre de la empresa',
                                fillColor: 'white'
                            },
                            {
                                text: 'Direccion',
                                fillColor:'#3A4546',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Dirección de la empresa',
                                fillColor: 'white'
                            }
                        ],
                        [
                            {
                                text: 'NIT',
                                fillColor:'#3A4546',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'NIT de la empresa',
                                fillColor: 'white'
                            },
                            {
                                text: 'Teléfono',
                                fillColor:'#3A4546',
                                color: 'white',
                                bold: true,
                            },
                            {
                                text: 'Teléfono de la empresa',
                                fillColor: 'white'
                            }
                        ]
                    ]
                }
            },
        ]
    };

    return docDefinition;
};