export interface Comment {
  id?: string;
  createdAt?: Date;
  userId: string;
  productId: string;
  rating: number;
  content: string;
}
