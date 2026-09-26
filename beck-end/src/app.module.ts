import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { ProductsModule } from './products/products.module.js';
import { BrandsModule } from './brands/brands.module.js';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CategoriesModule,
        PrismaModule,
        ProductsModule,
        BrandsModule,
    ],
    providers: [
        PrismaModule,
        CategoriesModule,
        ProductsModule,
        BrandsModule,

    ],
})
export class AppModule {}