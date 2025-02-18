import { HttpAdapter, PokeApiAdapter, PokeApiAdapterFetch } from '../api/pokeApi.adapter';
import { Move, PokeapiResponse} from '../interfaces/pokeapi-response.interface';

export class Pokemon{

    // Forma larga
    // public id: number;
    // public name: string;

    // constructor(id:number, name:string){
    //     this.id = id;
    //     this.name = name;
    // }

    get imageUrl(): string{
        return `https://pokemon.com/${ this.id }.jpg`
    }

    // Forma Corta
    constructor(
        public readonly id:number, // Esta propiedad impide error para asignar nuevo valor a este atributo
        public name:string,
        // A continuacion realiza inyeccion de dependencias
        private http:HttpAdapter
    ){}

    public scream(){
        console.log(`${ this.name.toUpperCase() }!!!`);
        this.speak();
    }

    private speak(){
        console.log(`${ this.name}, ${ this.name}`);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokeapiResponse>(`https://pokeapi.co/api/v2/pokemon/${ this.id }`); // Implementa desestrcuturacion al acceder directamente a propiedad de la respuesta
        console.log(data.moves);

        return data.moves;
    }
}


// const pokeApi = new PokeApiAdapter();

const pokeApiFetch = new PokeApiAdapterFetch();


// export const mew = new Pokemon(151, 'Mew',pokeApi);

export const mew = new Pokemon(151, 'Mew',pokeApiFetch); // Funciona igual que la primer definicion gracias a la interfaz HttpAdapter

// mew.id = 10 // Genera error ya que la propiedad ya fue definida

console.log(mew.imageUrl);
mew.scream();
// mew.speak(); // No es posible utilizarlo debido al modificador de acceso private

mew.getMoves();