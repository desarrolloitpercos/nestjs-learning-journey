const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      // console.log({target})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}


export class Pokemon{

    constructor(
        public id: number,
        public name: string
    ) {}

    attack(){
        console.log(`${this.name} used tackle`);
    }

    @Deprecated('Most use speak2 method instead')
    speak(){
        console.log(`${this.name},${this.name}`);
    }
}

export const vulpix = new Pokemon(37,'Vulpix');

vulpix.attack();
vulpix.speak();