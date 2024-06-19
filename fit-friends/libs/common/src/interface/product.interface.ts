import { TGuitarType } from '../types/guitar.type';

export interface Product {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  photo: string;
  type: TGuitarType;
  article: string;
  stringCount: number;
  price: number;
}
