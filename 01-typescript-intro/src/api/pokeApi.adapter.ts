import axios from 'axios';

export interface HttpAdapter{
    get<T> (rul: string): Promise<T>;
}


export class PokeApiAdapterFetch implements HttpAdapter{
    async get<T>(url: string): Promise<T>{
        const resp = await fetch(url);
        const data = await resp.json();

        console.log('Adapter con Fetch')

        return data;
    }
}

export class PokeApiAdapter implements HttpAdapter{

    private readonly axios = axios; // posteriormente se utiliza con this para evidenciar posibles cambios


    // async get<T>(url: string): Promise<T>{ //Aun mas explicito
    async get<T>(url: string){
        const {data} = await this.axios.get<T>(url);
        console.log('Adapter con Axios')
        return data;
    }

    async post(url:string, data:any){

    }

    async patch(url:string, data:any){
        
    }

    async delete(url:string, data:any){
        
    }

}