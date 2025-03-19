import * as Utils from 'src/helpers/chart-utils';

interface DonutEntry {
    label: string | null,
    value: number
}

interface DonutOptions{
    position?: 'left' | 'right' | 'top' | 'bottom';
    entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {

    const {position = 'top' } = options;
    const data = {
        labels: options.entries.map((e) => e.label),
        datasets: [
            {
                label: 'Dataset 1',
                data: options.entries.map((e) => e.value),
            }
        ]
    }

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            title: {
                display: true,
                text: 'Chart.js Doughnut Chart'
            },
            responsive: true,
            plugins:{
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 14,
                    }
                }
            },         
            legend: {
                position: position,
            }
        },
    };

    return Utils.chartJsToImage(config);
};