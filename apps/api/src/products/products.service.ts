import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductResponseDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private prisma = new PrismaClient();

  private R2_ENDPOINT = process.env.R2_ENDPOINT
  private R2_ENDPOINT_PUBLIC = process.env.R2_ENDPOINT_PUBLIC

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

    return products.map((product: {
      id: string;
      name: string;
      description: string;
      height: number;
      length: number;
      width: number;
      brand: string;
      tier: string;
      price: number;
      createdAt: Date;
      updatedAt: Date;
      images: { url: string }[];
    }) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      height: product.height,
      length: product.length,
      width: product.width,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      images: product.images,
      brand: product.brand,
      tier: product.tier,
      price: product.price
    }));
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.prisma.catalogProduct.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return {
      id: (product as any).id,
      name: (product as any).name,
      description: (product as any).description,
      height: (product as any).height,
      length: (product as any).length,
      width: (product as any).width,
      brand: (product as any).brand,
      tier: (product as any).tier,
      price: (product as any).price,
      createdAt: (product as any).createdAt,
      updatedAt: (product as any).updatedAt,
      images: (product as any).images
    };
  }

  async create(data: CreateProductDto) {
    return this.prisma.catalogProduct.create({
      data,
    });
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id);
    
    const { images, ...updateData } = data;
    
    return this.prisma.catalogProduct.update({
      where: { id },
      data: updateData,
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
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
    
    const transformedUrls = fileUrls.map(url => {
      return url.replace(this.R2_ENDPOINT as string, this.R2_ENDPOINT_PUBLIC as string);
    });

    const imagePromises = transformedUrls.map(url => {
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
