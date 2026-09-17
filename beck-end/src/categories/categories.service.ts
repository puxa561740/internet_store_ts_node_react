import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class CategoriesService {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async findAll() {
        return this.prisma.category.findMany();
    }

    async findOne(id: number) {
        const category = await this.prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!category) {
            throw new NotFoundException(
                'Category not found',
            );
        }

        return category;
    }

    async create(data: CreateCategoryDto) {
        return this.prisma.category.create({
            data: {
                name: data.name,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.category.delete({
            where: {
                id,
            },
        });
    }
}