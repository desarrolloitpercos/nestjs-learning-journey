import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer{
    [key: string]: string;
}

export const getHtmlContent = (
    html: string,
    replacers: ContentReplacer = {}
) => {

    Object.entries(replacers).forEach(([key, value]) => {

        const key1 = `{{ ${key} }}`;
        const key2 = `{{${key}}}`;

        html = html.replace(key1,value).replaceAll(key2, value);
    });

    const { window } = new JSDOM();

    // TODO:  Implementar funcion
    return htmlToPdfmake(html,  {window});
}