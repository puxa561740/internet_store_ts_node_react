import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
} from '@nestjs/common';

import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Controller('categories')
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService,
    ) {}

    @Get()
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(
            Number(id),
        );
    }

    @Post()
    create(@Body() body: CreateCategoryDto) {
        return this.categoriesService.create(body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(
            Number(id),
        );
    }
}