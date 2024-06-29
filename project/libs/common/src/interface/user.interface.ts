export interface User {
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
