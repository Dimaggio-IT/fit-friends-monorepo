import { Entity, Product, StorableEntity } from '@project/shared/core';
import { TGuitarType } from '@project/shared/core';

export class ShopProductEntity extends Entity implements StorableEntity<Product> {
  public name?: string;
  public description?: string;
  public createdAt?: Date;
  public photo?: string;
  public type?: TGuitarType;
  public article?: string;
  public stringCount?: number;
  public price?: number;

  constructor(product?: Product) {
    super();
    this.populate(product);
  }

  public populate(product?: Product) {
    if (!product) {
      return;
    }

    this.id = product.id ?? undefined;
    this.name = product.name;
    this.description = product.description;
    this.createdAt = product.createdAt;
    this.photo = product.photo;
    this.type = product.type;
    this.article = product.article;
    this.stringCount = product.stringCount;
    this.price = product.price;
  }

  public toPOJO(): Product {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      photo: this.photo,
      type: this.type,
      article: this.article,
      stringCount: this.stringCount,
      price: this.price,
    }
  }
}
