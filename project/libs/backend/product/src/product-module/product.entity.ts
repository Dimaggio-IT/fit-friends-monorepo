import { Entity, IComment, IProduct, ProductType, StorableEntity, TrainingSex, UserLevel } from '@project/common';

export class ProductEntity extends Entity implements StorableEntity<IProduct> {
  public createdAt?: Date;
  public rating: number;
  public name: string;
  public backgroundImage: string;
  public userLevel: string;
  public type: string;
  public duration: string;
  public price: number;
  public amountOfCalories: number;
  public description: string;
  public sex: string;
  public video: string;
  public coachId: string;
  public isSpecial: boolean;
  public comments: IComment[];

  constructor(product?: IProduct) {
    super();
    this.populate(product);
  }

  public populate(product?: IProduct) {
    if (!product) {
      return;
    }

    this.id = product.id ?? undefined;
    this.createdAt = product.createdAt ?? undefined;
    this.rating = product.rating ?? 0;
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
    this.coachId = product.coachId;
    this.isSpecial = product.isSpecial;
    this.comments = product.comments ?? [];
  }

  public toPOJO(): IProduct {
    return {
      id: this.id,
      createdAt: this.createdAt,
      rating: this.rating,
      name: this.name,
      backgroundImage: this.backgroundImage,
      userLevel: this.userLevel as UserLevel,
      type: this.type as ProductType,
      duration: this.duration,
      price: this.price,
      amountOfCalories: this.amountOfCalories,
      description: this.description,
      sex: this.sex as TrainingSex,
      video: this.video,
      coachId: this.coachId,
      isSpecial: this.isSpecial,
      comments: this.comments,
    }
  }
}
