import fs from 'fs';

import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as Utils from '../helpers/chart-utils';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf8');

const generateChartImage = async () => {
    const chartConfig = {
        type:'bar',
        data:{
            labels:['Q1','Q2','Q3','Q4'], 
            datasets:[{label:'Users',
                data:[50,60,70,180]
            }]
        }
    }

    return Utils.chartJsToImage(chartConfig);
};

export const getBasicChartSvgReport =
    async (): Promise<TDocumentDefinitions> => {
        const chart = await generateChartImage();
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
            ]
        }
    }