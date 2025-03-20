import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers/chart-utils';
import { getDonutChart } from "./charts/donut.chart";
import { getLineChart } from "./charts/line.chart";
import { headerSection } from "./sections/header.section";

interface TopCountry {
  country: string | null;
  customers: number;
}

interface ReportOptions {
  title?: string;
  subTitle?: string;
  topCountries: TopCountry[];
}

// const generateTopCountryDonut = async (topCountries: TopCountry[]): Promise<string> => {
//     const data = {
//         labels: topCountries.map((country) => country.country),
//         datasets: [
//             {
//                 label: 'Dataset 1',
//                 data: topCountries.map((country) => country.customers),
//             }
//         ]
//     }

//     const config = {
//         type: 'doughnut',
//         data: data,
//         options: {
//             title: {
//                 display: true,
//                 text: 'Chart.js Doughnut Chart'
//             },
//             responsive: true,
//             plugins:{
//                 datalabels: {
//                     color: 'white',
//                     font: {
//                         weight: 'bold',
//                         size: 14,
//                     }
//                 }
//             },         
//             legend: {
//                 position: 'top',
//             }
//         },
//     };

//     return Utils.chartJsToImage(config);
// };

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> => {

  const { title, subTitle, topCountries } = options;

  // En esta linea se imlementa la funcion con el metodo en esta misma clase
  // const donutChart = await generateTopCountryDonut(topCountries);

  const donutChart = await getDonutChart({
    entries: topCountries.map((c) => ({
      label: c.country,
      value: c.customers
    })),
    position: 'left'
  });

  const lineChart = await getLineChart({
    entries: topCountries.map((c) => ({
      label: c.country,
      value: c.customers
    })),
  });

  const docDefinition: TDocumentDefinitions = {
    pageMargins: [40, 100, 40, 60],
    header: headerSection({
      title: options.title ?? 'Estadísticas de clientes',
      subTitle: options.subTitle ?? 'Top 10 países con más clientes',
    }),
    content: [{
      columns: [{
        stack: [
          {
            text: '10 países con más clientes',
            alignment: 'center',
            margin: [0, 0, 0, 10]
          }, {
            image: donutChart,
            width: 320
          }
        ],
        margin: [0, 0, 0, 50]
      }, {
        layout: 'lightHorizontalLines',
        width: 'auto',
        table: {
          headerRows: 1,
          widths: [100, 'auto'],
          body: [
            ['País', 'Clientes'],
            ...options.topCountries.map((c) => [
              c.country ?? '',
              c.customers
            ]),
          ]
        }
      }]
    },
    {
      image: lineChart,
      width: 500,
      alignment: 'center'
    }]
  };

  return docDefinition;
};