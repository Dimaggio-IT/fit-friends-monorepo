import { WorkoutType } from '../enum/shared.enum';
import { UserLevel, UserRole } from '../enum/user.enum';
import { IBalance } from './balance.interface';
import { IFriend } from './friend.interface';
import { IOrder } from './order.interface';

export interface IUser {
  id?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
  description: string;
  location: string;
  backgroundImage?: string;
  sex: string;
  birthday: Date;
  login: string;
  email: string;
  level: UserLevel;
  role: UserRole;
  trainingType: WorkoutType[];
  timeForTraining?: string;
  caloriesToReset?: number;
  caloriesToResetPerDay?: number;
  isReadyToTrain?: boolean;
  isPersonalTraining?: boolean;
  achievement?: string;
  certificate?: string[];
  friends?: IFriend[];
  balances?: IBalance[];
  orders?: IOrder[];
}

export interface IUserRdo {
  id: string;
  createdAt?: string;
  updatedAt?: Date;
  avatar?: string;
  description: string;
  location: string;
  backgroundImage?: string;
  sex: string;
  birthday: string;
  login: string;
  email: string;
  level: string;
  role: UserRole;
  trainingType: string[];
  timeForTraining?: string;
  caloriesToReset?: number;
  caloriesToResetPerDay?: number;
  isReadyToTrain?: boolean;
  isPersonalTraining?: boolean;
  achievement?: string;
  certificate?: string[];
  friends?: IFriend[];
  balances?: IBalance[];
  orders?: IOrder[];
}

export interface IUsersWithPagination {
  entities: IUserRdo[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
