import fs from 'fs';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateDonut = async () => {

    const DATA_COUNT = 5;
    const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

    const data = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: Utils.numbers(NUMBER_CFG),
                backgroundColor: Object.values(Utils.CHART_COLORS),
            }
        ]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }                
            }
        },
    };
    return Utils.chartJsToImage(config);
}

const generateChartImage = async () => {
    const chartConfig = {
        type: 'bar',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                label: 'Users',
                data: [50, 60, 70, 180]
            }]
        }
    }

    return Utils.chartJsToImage(chartConfig);
};

export const getBasicChartSvgReport =
    async (): Promise<TDocumentDefinitions> => {

        const [chart, chartDonut] = await Promise.all([generateChartImage(), generateDonut()]);

        // const chart = await generateChartImage();
        // const chartDonut = await generateDonut();
        
        return {
            content: [
                {
                    svg: svgContent,
                    width: 50,
                    fit: [100, 100]
                },
                {
                    image: chart,
                    width: 500,
                },
                {
                    image: chartDonut,
                    width: 500
                }
            ]
        }
    }