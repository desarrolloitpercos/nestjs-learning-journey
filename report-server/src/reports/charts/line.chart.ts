import * as Utils from 'src/helpers/chart-utils';

interface LineEntry {
    label: string | null,
    value: number
}

interface LineOptions {
    entries: LineEntry[];
}

export const getLineChart = async (options: LineOptions): Promise<string> => {

    const data = {
        labels: options.entries.map((e) => e.label),
        datasets: [{
            label: 'My First Dataset',
            data: options.entries.map((e) => e.value),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
    };

    return Utils.chartJsToImage(config);
}