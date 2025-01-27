import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  CreateProductSchema,
  UpdateProductSchema,
} from './dto/product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<any> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new JoiValidationPipe(CreateProductSchema))
  create(@Body() createProductDto: CreateProductDto): Promise<any> {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @UsePipes(new JoiValidationPipe(UpdateProductSchema))
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<any> {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.productsService.remove(id);
  }
}
