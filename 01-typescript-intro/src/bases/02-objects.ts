export const pokemonIds = [10,20]

// pokemonIds.push('asfa') // Genera error pero en javascript si es posible

interface Pokemon{
    id: number;
    name: string;
    type: string | undefined; // Esta propiedad debe estar definida con el valor o 'indefinido'
    age?: number; // La propiedad es opcional
}

export const vulpix:Pokemon = {
    id: 1,
    name: 'Vulpix',
    type: 'Fire'
}

export const eevee:Pokemon = {
    id: 0,
    name: "Eevee",
    type: 'Normal',
    age: 7
}

console.log(vulpix);
console.log('Pokemon name: ',vulpix.name);

// Arreglo de Objeto
export const pokemons: Pokemon[] = [];
pokemons.push(eevee, vulpix);

console.log(pokemons)