import { OrderType, PaymentType } from '../enum/order.enum';

export interface IOrder {
  id?: string;
  createdAt?: Date;
  type: OrderType;
  productId: string;
  userId: string;
  price: number;
  quantity: number;
  sum: number;
  paymentType: PaymentType;
}
