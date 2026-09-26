import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBrandDto } from './dto/create-brand.dto.js';

@Injectable()
export class BrandsService {

    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async findAll() {
        return this.prisma.brand.findMany();
    }

    async findOne(id: number) {
        const brand = await this.prisma.brand.findUnique({
            where: {
                id,
            },
        });

        if (!brand) {
            throw new NotFoundException(
                'Brand not found',
            );
        }

        return brand;
    }

    async create(data: CreateBrandDto) {
        return this.prisma.brand.create({
            data: {
                name: data.name,
            },
        });
    }

    async remove(id: number) {
        await this.findOne(id);

        return this.prisma.brand.delete({
            where: {
                id,
            },
        });
    }
}