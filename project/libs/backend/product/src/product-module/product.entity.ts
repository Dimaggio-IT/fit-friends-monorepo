import { Entity, Product, ProductType, StorableEntity, TrainingSex, UserLevel } from '@project/common';

export class ProductEntity extends Entity implements StorableEntity<Product> {
  public createdAt?: Date;
  public rating?: number;
  public name: string;
  public backgroundImage: string;
  public userLevel: UserLevel;
  public type: ProductType;
  public duration: string;
  public price: number;
  public amountOfCalories: number;
  public description: string;
  public sex: TrainingSex;
  public video: string;
  public coach: string;
  public isSpecial: boolean;

  constructor(product?: Product) {
    super();
    this.populate(product);
  }

  public populate(product?: Product) {
    if (!product) {
      return;
    }

    this.id = product.id ?? undefined;
    this.createdAt = product.createdAt ?? undefined;
    this.rating = product.rating?? undefined;
    this.name = product.name;
    this.backgroundImage = product.backgroundImage;
    this.userLevel = product.userLevel;
    this.type = product.type;
    this.duration = product.duration;
    this.price = product.price;
    this.amountOfCalories = product.amountOfCalories;
    this.description = product.description;
    this.sex = product.sex;
    this.video = product.video;
    this.coach = product.coach;
    this.isSpecial = product.isSpecial;
  }

  public toPOJO(): Product {
    return {
      id: this.id,
      createdAt: this.createdAt,
      rating: this.rating,
      name: this.name,
      backgroundImage: this.backgroundImage,
      userLevel: this.userLevel,
      type: this.type,
      duration: this.duration,
      price: this.price,
      amountOfCalories: this.amountOfCalories,
      description: this.description,
      sex: this.sex,
      video: this.video,
      coach: this.coach,
      isSpecial: this.isSpecial
    }
  }
}
