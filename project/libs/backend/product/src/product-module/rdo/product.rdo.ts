import { IComment, WorkoutType, TrainingSex, UserLevel } from '@project/common';
import { Expose } from 'class-transformer';
import { IProductRdo } from '@project/common';

export class ProductRdo implements IProductRdo{
  @Expose()
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public rating: number;

  @Expose()
  public name: string;

  @Expose()
  public backgroundImage: string;

  @Expose()
  public userLevel: UserLevel;

  @Expose()
  public type: WorkoutType;

  @Expose()
  public duration: string;

  @Expose()
  public price: number;

  @Expose()
  public amountOfCalories: number;

  @Expose()
  public description: string;

  @Expose()
  public sex: TrainingSex;

  @Expose()
  public video: string;

  @Expose()
  public coachId: string;

  @Expose()
  public coachName: string;

  @Expose()
  public coachAvatar: string;

  @Expose()
  public isSpecial: boolean;

  @Expose()
  public comments: IComment[];
}
