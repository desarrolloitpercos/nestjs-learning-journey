import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto} from './dto/index';

@Controller('cars')
// @UsePipes( ValidationPipe ) // Aplica para todos los métodos del controlador
export class CarsController {

    constructor(
        // Esta es la inyeccion del service que contiene la logica de negocio
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id') id: string){
        return this.carsService.findOneById(id);
    }

    @Post()
    // @UsePipes( ValidationPipe ) // Aplica solamente para el metodo
    createCar( @Body() createCarDto: CreateCarDto ){
        return this.carsService.createCar(createCarDto);
    }

    @Patch(':id')
    updateCar( 
        @Param('id') id: string,
        @Body() updateCarDto: UpdateCarDto
    ){
        return this.carsService.updateCar(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar( @Param('id', new ParseUUIDPipe()) id: string){
        return this.carsService.deleteCar(id);
    }
}
