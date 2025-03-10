import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { footerSection } from "./sections/footer.section";
import { countries as Country } from "@prisma/client";

interface ReportOptions {
    title?: string;
    subTitle?: string;
    countries: Country[];
}

export const getCountriesReport = (options: ReportOptions): TDocumentDefinitions => {

    const { title, subTitle, countries } = options;

    return {
        pageOrientation: 'landscape',
        header: headerSection({
            title: title ?? 'Countries Report',
            subTitle: subTitle ?? 'List of Countries'
        }),
        footer: footerSection,
        pageMargins: [40, 110, 40, 60],
        content: [
            {
                layout: 'customLayout01',
                table: {
                    headerRows: 1,
                    widths: [50, 50, 50, '*', 'auto', '*'],

                    body: [
                        ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
                        ...countries.map((country) => [
                            country.id.toString() ?? "",
                            country.iso2 ?? "",
                            country.iso3 ?? "",
                            { text: country.name ?? "", bold: true },
                            country.continent ?? "",
                            country.local_name ?? ""
                        ]),
                    ],
                },
            },
            {
                layout: 'noBorders',
                margin: [30,30],
                table: {
                    headerRows: 1,
                    widths: [50, 50, 50, 70, '*', '*'],
                    body: [
                        [{}, {}, {}, {
                            text: 'Total de países',
                            bold: true,
                        },
                        {
                            text: ` ${ countries.length } países`,
                            bold: true,
                        },
                        ]
                    ],
                },
            },
        ],
    };
};