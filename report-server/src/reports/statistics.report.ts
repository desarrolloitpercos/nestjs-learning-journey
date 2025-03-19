import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Utils from 'src/helpers/chart-utils';
import { getDonutChart } from "./charts/donut.chart";

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

export const getStatisticsReport = async (options: ReportOptions): Promise<TDocumentDefinitions> =>{
    
    const {title, subTitle, topCountries} = options;

    // En esta linea se imlementa la funcion con el metodo en esta misma clase
    // const donutChart = await generateTopCountryDonut(topCountries);

    const donutChart = await getDonutChart({
        entries: topCountries.map((c) => ({
            label: c.country,
            value: c.customers
        })),
        position: 'left'
    });

    const docDefinition: TDocumentDefinitions = {
          content: [{
            image: donutChart,
            width: 500
          }]
        };
    
        return docDefinition;
};