import { UserRole } from '../enum/user.enum';
import { IFriend } from './friend.interface';

export interface IUser {
  id?: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
  description: string;
  location: string;
  backgroundImage: string;
  sex: string;
  birthday: Date;
  login: string;
  email: string;
  level: string;
  role: UserRole;
  trainingType: string[];
  timeForTraining: string;
  caloriesToReset: number;
  caloriesToResetPerDay: number;
  isReadyToTrain: boolean;
  friends: IFriend[];
}

export interface IUserRdo {
  id?: string;
  createdAt?: string;
  updatedAt?: Date;
  avatar: string;
  description: string;
  location: string;
  backgroundImage: string;
  sex: string;
  birthday: string;
  login: string;
  email: string;
  level: string;
  role: UserRole;
  trainingType: string[];
  timeForTraining: string;
  caloriesToReset: number;
  caloriesToResetPerDay: number;
  isReadyToTrain: boolean;
  friends: IFriend[];
}

export interface IUsersWithPagination {
  entities: IUserRdo[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
