import { TrainingSex } from '../enum/product.enum';
import { ProductType } from '../enum/shared.enum';
import { UserLevel } from '../enum/user.enum';

export interface Product {
  id?: string;
  createdAt?: Date;
  rating?: number;
  name: string;
  backgroundImage: string;
  userLevel: UserLevel;
  type: ProductType;
  duration: string;
  price: number;
  amountOfCalories: number;
  description: string;
  sex: TrainingSex;
  video: string;
  coach: string;
  isSpecial: boolean;
}
