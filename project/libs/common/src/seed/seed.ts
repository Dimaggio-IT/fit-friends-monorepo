import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import {
  generateRandomBoolean,
  generateRandomValue,
  getRandomItem
} from '../helper/common';
import {
  COMMENT_MAX_RATING,
  COMMENT_MIN_RATING,
  COUNT_OF_COMMENTS,
  COUNT_OF_ORDER_BALANCE,
  COUNT_OF_PRODUCTS,
  COUNT_OF_USERS,
  PAYMENT_TYPE,
  PRODUCT_GENERATOR_CONFIG,
  PRODUCT_TYPE,
  TRAINING_SEX,
  USER_LEVEL,
  USER_PASSWORD_DEFAULT,
  USER_WITH_ORDER_BALANCE_INDEX,
  paymentType,
  productTypes,
  trainingsSex,
  userLevels
} from './constant';
import {
  commentMockData,
  productMockData,
  userMockData
} from './mock-data';
import { IComment } from '../interface/comment.interface';
import { IProduct } from '../interface/product.interface';
import {
  UserLevel,
  UserLocation,
  UserRole,
  UserSex
} from '../enum/user.enum';
import { ProductType } from '../enum/shared.enum';
import { TrainingSex } from '../enum/product.enum';
import { v4 as uuidV4 } from 'uuid';
import { IAuthUser } from '../interface/auth-user.interface';
import { USER_SALT_ROUNDS } from '../constant/user.constant';
import { faker } from '@faker-js/faker';
import { IFriend } from '../interface/friend.interface';

let mockProducts: IProduct[] = [];
let mockUsers: IAuthUser[] = [];

const getProducts = (): IProduct[] => Array.from({ length: COUNT_OF_PRODUCTS }, (_, index) => createProduct(index));

const getComments = (productId: string): IComment[] => Array.from({ length: COUNT_OF_COMMENTS }, (_, index) => createComment(productId, index));

const getRandomCoach = (): IAuthUser => {
  const coaches = mockUsers.filter(user => user.role === UserRole.Coach);
  return getRandomItem<IAuthUser>(coaches);
}

const getUsers = async (): Promise<IAuthUser[]> => {
  const users: IAuthUser[] = [];

  for (let i = 0; i < COUNT_OF_USERS; i++) {
    const user = await createUser(i);
    users.push(user);
  }

  return users;
};

// const getOrders = (): IOrder[] => Array.from({ length: COUNT_OF_ORDER_BALANCE }, (_, index) => createOrder(index));

// const getBalances = (): IBalance[] => Array.from({ length: COUNT_OF_ORDER_BALANCE }, (_, index) => createBalance(index));

const createProduct = (index: number): IProduct => {
  const productId = productMockData["ids"][index];
  const rating = generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_RATING, PRODUCT_GENERATOR_CONFIG.MAX_RATING);
  const name = getRandomItem<string>(productMockData['names']);
  const backgroundImage = productMockData["images"][index];
  const userLevel = USER_LEVEL[getRandomItem<keyof typeof USER_LEVEL>(userLevels)] as unknown as UserLevel;
  const type = PRODUCT_TYPE[getRandomItem<keyof typeof PRODUCT_TYPE>(productTypes)] as unknown as ProductType;
  const duration = getRandomItem<string>(productMockData['durations']);
  const price = generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_PRICE, PRODUCT_GENERATOR_CONFIG.MAX_PRICE);
  const amountOfCalories = generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_CALORIES, PRODUCT_GENERATOR_CONFIG.MAX_CALORIES);
  const description = productMockData["descriptions"][index];
  const sex = TRAINING_SEX[getRandomItem<keyof typeof TRAINING_SEX>(trainingsSex)] as unknown as TrainingSex;
  const video = 'video/test.avi';
  const coachId = (getRandomCoach().id as string);
  const isSpecial = generateRandomBoolean();
  const commentsById = getComments(productId);

  return {
    id: productId,
    rating,
    name,
    backgroundImage,
    userLevel,
    type,
    duration,
    price,
    amountOfCalories,
    description,
    sex,
    video,
    coachId,
    isSpecial,
    comments: faker.helpers.arrayElements(commentsById,
      { min: 1, max: 5 },
    ),
  }
};

const createComment = (productId: string, index: number): IComment => ({
  id: uuidV4(),
  userId: getRandomItem<string>(userMockData['ids']),
  productId,
  content: commentMockData['contents'][index],
  rating: generateRandomValue(COMMENT_MIN_RATING, COMMENT_MAX_RATING),
});

const createFriend = (userId: string, friendId: string): IFriend => ({
  id: uuidV4(),
  userId,
  friendId,
  isConfirmed: generateRandomBoolean(),
});

const getHash = async (password: string) => {
  const salt = await genSalt(USER_SALT_ROUNDS);
  return hash(password, salt);
};

const createUser = async (index: number): Promise<IAuthUser> => {
  const friends: IFriend[] = [];
  const userId = userMockData["ids"][index];
  const avatar = userMockData["avatars"][index];
  const description = userMockData["descriptions"][index];
  const location = userMockData["location"][index] as unknown as UserLocation;
  const backgroundImage = userMockData["backgroundImages"][index];
  const role = (getRandomItem<string>(userMockData["role"]) as unknown as UserRole);
  const sex = userMockData["sexes"][index] as unknown as UserSex;
  const birthday = userMockData["birthdays"][index] as unknown as Date;
  const login = userMockData["logins"][index];
  const email = userMockData["emails"][index];
  const level = userMockData["levels"][index] as unknown as UserLevel;
  const trainingType = userMockData["trainingTypes"][index] as unknown as ProductType[];
  const timeForTraining = userMockData["timeForTrainings"][index];
  const caloriesToReset = +userMockData["caloriesToResets"][index];
  const caloriesToResetPerDay = +userMockData["caloriesToResetsPerDays"][index];
  const isReadyToTrain = userMockData["isReadyToTrains"][index];
  const passwordHash = await getHash(USER_PASSWORD_DEFAULT);

  const nextUserId = userMockData["ids"][index + 1];
  const anotherNextUserId = userMockData["ids"][index + 2];

  if(nextUserId.length > 0) {
    friends.push(createFriend(userId, nextUserId));
  }

  if (anotherNextUserId.length > 0) {
    friends.push(createFriend(userId, anotherNextUserId));
  }

  return {
    id: userId,
    avatar,
    description,
    location,
    backgroundImage,
    sex,
    birthday,
    login,
    email,
    level,
    trainingType,
    timeForTraining,
    caloriesToReset,
    caloriesToResetPerDay,
    isReadyToTrain,
    passwordHash,
    role,
    friends,
  }
};

// const createOrder = (index: number): IOrder => {
//   const quantity = generateRandomValue(1, 10);
//   const sum = quantity * mockProducts[index].price;

//   return {
//     id: uuidV4(),
//     type: OrderType.Membership,
//     productId: mockProducts[index].id as unknown as string,
//     userId: mockUsers[USER_WITH_ORDER_BALANCE_INDEX].id as unknown as string,
//     price: mockProducts[index].price,
//     quantity,
//     sum,
//     paymentType: PAYMENT_TYPE[getRandomItem<keyof typeof PAYMENT_TYPE>(paymentType)] as unknown as PaymentType
//   }
// };

// const createBalance = (index: number): IBalance => ({
//   id: uuidV4(),
//   userId: mockOrders[index].userId,
//   productId: mockProducts[index].id as unknown as string,
//   quantity: mockOrders[index].quantity
// });

async function seedDb(prismaClient: PrismaClient): Promise<void> {
  mockUsers = await getUsers();
  mockProducts = getProducts();

  // for (const user of mockUsers) {
  //   await prismaClient.user.upsert({
  //     where: { id: user.id },
  //     update: {},
  //     create: {
  //       id: user.id,
  //       avatar: user.avatar,
  //       description: user.description,
  //       location: user.location,
  //       backgroundImage: user.backgroundImage,
  //       sex: user.sex,
  //       birthday: user.birthday,
  //       login: user.login,
  //       email: user.email,
  //       level: user.level,
  //       trainingType: user.trainingType,
  //       timeForTraining: user.timeForTraining,
  //       caloriesToReset: user.caloriesToReset,
  //       caloriesToResetPerDay: user.caloriesToResetPerDay,
  //       isReadyToTrain: user.isReadyToTrain,
  //       passwordHash: ''
  //     }
  //   })
  // }
  console.log(mockProducts);
  for (const product of mockProducts) {
    await prismaClient.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        rating: product?.rating ?? undefined,
        name: product.name,
        backgroundImage: product.backgroundImage,
        userLevel: product.userLevel,
        type: product.type,
        duration: product.duration,
        price: product.price,
        amountOfCalories: product.amountOfCalories,
        description: product.description,
        sex: product.sex,
        video: product.video,
        coachId: product.coachId,
        isSpecial: product.isSpecial,
        comments: {
          create: [
            ...(product.comments as [])
          ]
        }
      }
    })
  }

  // for (const comment of mockComments) {
  //   await prismaClient.comment.upsert({
  //     where: { id: comment.id },
  //     update: {},
  //     create: {
  //       id: comment.id,
  //       userId: comment.userId,
  //       productId: comment.productId,
  //       content: comment.content,
  //       rating: comment.rating,
  //     }
  //   })
  // }

  // for (const order of mockOrders) {
  //   await prismaClient.order.upsert({
  //     where: { id: order.id },
  //     update: {},
  //     create: {
  //       id: order.id,
  //       type: order.type,
  //       productId: order.productId,
  //       userId: order.userId,
  //       price: order.price,
  //       quantity: order.quantity,
  //       sum: order.sum,
  //       paymentType: order.paymentType
  //     }
  //   })
  // }

  // for (const balance of mockBalances) {
  //   await prismaClient.balance.upsert({
  //     where: { id: balance.id },
  //     update: {},
  //     create: {
  //       id: balance.id,
  //       userId: balance.userId,
  //       productId: balance.productId,
  //       quantity: balance.quantity,
  //     }
  //   })
  // }

  console.info('🤘️ Database was filled');
}

async function bootstrap(): Promise<void> {
  const prismaClient = new PrismaClient();

  await prismaClient.$transaction([
    prismaClient.user.deleteMany(),
    prismaClient.comment.deleteMany(),
    prismaClient.order.deleteMany(),
    prismaClient.balance.deleteMany(),
    prismaClient.product.deleteMany(),
    prismaClient.friend.deleteMany(),
    prismaClient.notification.deleteMany(),
  ]);

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
