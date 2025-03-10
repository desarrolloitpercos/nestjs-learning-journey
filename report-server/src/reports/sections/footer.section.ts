import { Content } from "pdfmake/interfaces";

export const footerSection = (currentPage: number, pageCount: number): Content => {

    return {
        text: `${ currentPage.toString() } de ${ pageCount }`,
        alignment: 'right',
        fontSize: 10,
        margin: [0, 10, 30, 0]
    }
}