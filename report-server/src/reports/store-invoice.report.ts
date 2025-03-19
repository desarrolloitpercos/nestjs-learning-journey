import { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { CurrencyFormatter, DateFormatter } from "src/helpers";
import { footerSection } from "./sections/footer.section";

export interface CompleteOrder {
    order_id:      number;
    customer_id:   number;
    order_date:    Date;
    customers:     Customers;
    order_details: OrderDetail[];
}

export interface Customers {
    customer_id:   number;
    customer_name: string;
    contact_name:  string;
    address:       string;
    city:          string;
    postal_code:   string;
    country:       string;
}

export interface OrderDetail {
    order_detail_id: number;
    order_id:        number;
    product_id:      number;
    quantity:        number;
    products:        Products;
}

export interface Products {
    product_id:   number;
    product_name: string;
    category_id:  number;
    unit:         string;
    price:        string;
}



const logo: Content = {
    image: 'src/assets/tucan-banner.png',
    width: 100,
    height: 30,
    margin: [10, 30]
};

const styles: StyleDictionary = {
    header: {
        fontSize: 20,
        bold: true,
        margin: [0, 30, 0, 0]
    },
};

interface ReportValues {
    tittle?: string;
    subTittle?: string;
    data: CompleteOrder;
}

export const getStoreInvoiceReport = (value: ReportValues): TDocumentDefinitions => {

    const { data } = value;

    const { customers, order_details } = data

    const docDefinition: TDocumentDefinitions = {
        styles: styles,
        header: logo,
        pageMargins: [50, 70],
        footer: footerSection,
        content: [
            {
                text: 'Tucan Code',
                style: 'header,'
            },
            {
                columns: [
                    {
                        text: `${customers.address}, \nOttawa ON K2Y 9X1, ${customers.city}\nBN: ${customers.postal_code}\nhttps://devtalles.com`,
                        bold: true
                    }, {
                        text: [{text: 'Recibo No#: 10255\n', bold: true, fontSize: 14},
                            `Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(new Date())}\nPagar antes de: 18 de mayo de 2025`],
                        alignment: 'right',
                    }
                ],
            },
            {qr: `https://laboratorioslegrand.com/`, fit: 75, alignment: 'right'},

            // Direccion del cliente
            {
                text: [
                    {text: `Cobrar a:\n\n`, bold: true, fontSize: 14},
                    `Razón Social: ${customers.contact_name}\nMichael Holz\nGrenzacherweg 237`,
                ]
            },

            // Tabla del detalle de orden
            {
                layout: 'headerLineOnly',
                margin: [0, 20],
                table: {
                    headerRows: 1,
                    widths: [50, '*', 'auto', 'auto', 'auto'],
                    body: [
                        ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
                        ...order_details.map((order_detail) => [
                            order_detail.order_detail_id.toString(),
                            order_detail.products.product_name,
                            order_detail.quantity,                            
                            {
                                text:CurrencyFormatter.formatCurrency(+order_detail.products.price),
                                alignment: 'right'
                            },
                            {
                                text:CurrencyFormatter.formatCurrency(+order_detail.products.price*order_detail.quantity),
                                alignment: 'right'
                            },
                        ])
                    ],
                }
            },
            '\n',
            {
                columns: [
                    {
                        width: '*',
                        text: '',
                    },
                    {
                        width: 'auto',
                        layout: 'noBorders',
                        table: {
                            body: [
                                ['Subtotal', {
                                    text: CurrencyFormatter.formatCurrency(1500),
                                    alignment: 'right'
                                }],
                                ['Total', {
                                    text: CurrencyFormatter.formatCurrency(5500),
                                    alignment: 'right'
                                }]
                            ]
                        }
                    }

                ]
            }
        ],
    };

    return docDefinition;
};