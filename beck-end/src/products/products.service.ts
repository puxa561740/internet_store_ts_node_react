import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { QueryProductDto } from './dto/query-product.dto.js';




@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
  return this.prisma.product.create({
    data: {
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock ?? 0,

      category: {
        connect: {
          id: createProductDto.categoryId,
        },
      },

      brand: {
        connect: {
          id: createProductDto.brandId,
        },
      },
    },
  });
}

  async findAll(query: QueryProductDto) {
    const {
      search,
      minPrice,
      maxPrice,
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    const where = {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
              {
                description: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),

      ...(minPrice !== undefined || maxPrice !== undefined
        ? {
            price: {
              ...(minPrice !== undefined
                ? { gte: minPrice }
                : {}),
              ...(maxPrice !== undefined
                ? { lte: maxPrice }
                : {}),
            },
          }
        : {}),
    };

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
      }),

      this.prisma.product.count({
        where,
      }),
    ]);

    return {
      data: products,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${id} not found`,
      );
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...(updateProductDto.name !== undefined && {
          name: updateProductDto.name,
        }),

        ...(updateProductDto.description !== undefined && {
          description: updateProductDto.description,
        }),

        ...(updateProductDto.price !== undefined && {
          price: updateProductDto.price,
        }),

        ...(updateProductDto.stock !== undefined && {
          stock: updateProductDto.stock,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}