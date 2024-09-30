export interface IComment {
  id?: string;
  createdAt?: Date;
  userAvatar?: string;
  userName?: string;
  userId: string;
  productId: string;
  rating: number;
  content: string;
}
