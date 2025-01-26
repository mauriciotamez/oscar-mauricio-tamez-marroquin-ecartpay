import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductResponseDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.prisma.catalogProduct.findMany({
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
      orderBy: [
        {
          id: 'desc',
        },
      ],
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      height: product.height,
      length: product.length,
      width: product.width,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      images: product.images,
    }));
  }

  async findOne(id: string) {
    const product = await this.prisma.catalogProduct.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    return this.prisma.catalogProduct.create({
      data,
    });
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.catalogProduct.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.catalogProduct.delete({
      where: { id },
    });
  }

  async updateProductFiles(id: string, fileUrls: string[]) {
    await this.findOne(id);
    
    const imagePromises = fileUrls.map(url => {
      return this.prisma.image.create({
        data: {
          url,
          catalogProductId: id,
        },
      });
    });

    await Promise.all(imagePromises);
  }
}
