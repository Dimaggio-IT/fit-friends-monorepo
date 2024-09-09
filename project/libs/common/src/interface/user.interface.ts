export interface IUser {
  id?: string;
  avatar: string;
  createdAt?: Date;
  description: string;
  location: string;
  backgroundImage: string;
  sex: string;
  birthday: Date;
  login: string;
  email: string;
  level: string;
  trainingType: string[];
  timeForTraining: string;
  caloriesToReset: number;
  caloriesToResetPerDay: number;
  isReadyToTrain: boolean;
}

export interface IUserRdo {
  id?: string;
  createdAt?: string;
  avatar: string;
  description: string;
  location: string;
  backgroundImage: string;
  sex: string;
  birthday: string;
  login: string;
  email: string;
  level: string;
  trainingType: string[];
  timeForTraining: string;
  caloriesToReset: number;
  caloriesToResetPerDay: number;
  isReadyToTrain: boolean;
}

export interface IUsersWithPagination {
  entities: IUserRdo[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
