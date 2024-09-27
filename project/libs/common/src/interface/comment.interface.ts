export interface IComment {
  id?: string;
  createdAt?: Date;
  userId: string;
  userName: string;
  userAvatar: string;
  productId: string;
  rating: number;
  content: string;
}
