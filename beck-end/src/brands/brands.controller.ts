import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { BrandsService } from './brands.service.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';

@Controller('brands')
export class BrandsController {

    constructor(
        private readonly brandsService: BrandsService,
    ) {}

    @Get()
    findAll() {
        return this.brandsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.brandsService.findOne(
            Number(id),
        );
    }

    @Post()
    create(@Body() body: CreateBrandDto) {
        return this.brandsService.create(body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.brandsService.remove(
            Number(id),
        );
    }
}