import { TrainingSex } from '../enum/product.enum';
import { ProductType } from '../enum/shared.enum';
import { UserLevel } from '../enum/user.enum';
import { IComment } from './comment.interface';

export interface IProduct {
  id?: string;
  createdAt?: Date;
  rating: number;
  name: string;
  backgroundImage: string;
  userLevel: string;
  type: string;
  duration: string;
  price: number;
  amountOfCalories: number;
  description: string;
  sex: string;
  video: string;
  coachId: string;
  isSpecial: boolean;
  comments?: IComment[];
}

export interface IProductRdo {
  id: string;
  createdAt: string;
  rating: number;
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
  coachId: string;
  isSpecial: boolean;
  comments: IComment[];
}

export interface IProductWithPagination {
  entities: IProductRdo[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
