
class FireTypePokemon{

    constructor(
        public id: number,
        public name: string
    ) {}

    attack(){
        console.log(`${this.name} used fire spin`);
    }

    speak(){
        console.log(`** Silent **`);
    }
}


const FireTypeDecorator = () => {
    return (target: Function) => {
        return FireTypePokemon
    }
}


@FireTypeDecorator()
export class Pokemon{

    constructor(
        public id: number,
        public name: string
    ) {}

    attack(){
        console.log(`${this.name} used tackle`);
    }

    speak(){
        console.log(`${this.name},${this.name}`);
    }
}

export const vulpix = new Pokemon(37,'Vulpix');

vulpix.attack();
vulpix.speak();