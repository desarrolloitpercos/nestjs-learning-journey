import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto/index';




@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Suzuki',
            model: 'Baleno'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ]

    findAll(){
        return this.cars;
    }

    findOneById(id: string){
        const car = this.cars.find( car => car.id == id);

        if ( !car )  throw new NotFoundException(`Car with id ${id} not found `);

        return car;
    }

    createCar(createCarDto: CreateCarDto){
        const newCar :Car = {
            id: uuid(),
            brand: createCarDto.brand,
            model: createCarDto.model
        }

        this.cars.push(newCar)
        return this.cars;
    }

    updateCar(id: string, updateCarDto: UpdateCarDto){
        let carDb = this.findOneById(id)

        this.cars = this.cars.map( car => {
            if (car.id === id){
                carDb = {...carDb, ...updateCarDto, id}
                return carDb;
            }
            return car;
        });

        return carDb;
    }

    deleteCar(id: string){ 
        
            this.findOneById(id)
            this.cars = this.cars.filter( car => car.id !== id);    
            return this.cars;
        }
}
