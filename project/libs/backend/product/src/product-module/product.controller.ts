import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { fillDto } from '@project/common';

import { ProductService } from './product.service';
import { ProductQuery } from './query/product.query';
import { ProductWithPaginationRdo } from './rdo/product-with-pagination.rdo';
import { CreateProductDto } from '@project/common';
import { UpdateProductDto } from '@project/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductError, ProductInfo } from './product.constant';
import { JwtAuthGuard } from '@project/authentication';
import { ProductRdo } from './rdo/product.rdo';

@ApiTags('product')
@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Show,
  })
  @Get('/:id')
  public async show(@Param('id') id: string) {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new NotFoundException(ProductError.ProductNotFound);
    }

    return product.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.ShowAll,
  })
  @Get('/')
  public async index(@Query() query: ProductQuery) {
    const productsWithPagination = await this.productService.getProductsByQuery(query);
    const result = {
      ...productsWithPagination,
      entities: productsWithPagination.entities.map((product) => product.toPOJO()),
    }

    return fillDto(ProductWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ProductInfo.Add,
  })
  @UseGuards(JwtAuthGuard)
  @Post('/')
  public async create(@Body() dto: CreateProductDto) {
    const newProduct = await this.productService.createProduct(dto);
    return newProduct.toPOJO();
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ProductInfo.Remove,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: ProductError.Delete
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  public async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.productService.deleteProductById(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ProductInfo.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  public async update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProductDto) {
    const updatedProduct = await this.productService.updateProduct(id, dto);

    if (!updatedProduct) {
      throw new NotFoundException(ProductError.ProductNotFound);
    }

    return fillDto(ProductRdo, updatedProduct.toPOJO());
  }
}
