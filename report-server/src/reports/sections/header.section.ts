import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers";

const logo: Content = {
    image: 'src/assets/tucan-code-logo.png',
    width: 100,
    height: 100,
    alignment: 'center',
    margin: [0, 0, 0, 20]
};

interface HeaderOptions {
    title?: string;
    subTitle?: string;
    showLogo?: boolean;
    showDate?: boolean;
}

const currentDate: Content = {
    text: DateFormatter.getDDMMMMYYYY(new Date()),
    alignment: 'right',
    margin: [10, 50, 50, 60],
}

export const headerSection = (options: HeaderOptions): Content => {
    const { title, subTitle, showLogo = true, showDate = true } = options;

    const headerLogo: Content = showLogo ? logo : '';
    const headerDate: Content = showDate ? currentDate : '';

    const headerSubTitle: Content = subTitle
        ? {
                text: subTitle,                
                alignment: 'right',
                style: {
                    bold: false,
                    fontSize: 18
                }
        }
        : '';



    const headerTitle: Content = title
        ? {
            stack: [{
                text: title,
                alignment: 'right',
                margin: [0, 15, 0, 0],
                style: {
                    bold: true,
                    fontSize: 22
                }
            },
            headerSubTitle,
        ]
        }
        : '';


    return {
        columns: [headerLogo, headerTitle, headerDate]
    }
};