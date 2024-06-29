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
import { Comment } from '../interface/comment.interface';
import { Product } from '../interface/product.interface';
import {
  UserLevel,
  UserLocation,
  UserSex
} from '../enum/user.enum';
import { ProductType } from '../enum/shared.enum';
import { TrainingSex } from '../enum/product.enum';
import { v4 as uuidV4 } from 'uuid';
import { AuthUser } from '../interface/auth-user.interface';
import { Order } from '../interface/order.interface';
import { OrderType, PaymentType } from '../enum/order.enum';
import { Balance } from '../interface/balance.interface';
import { USER_SALT_ROUNDS } from '../constant/user.constant';

let mockProducts: Product[] = [];
let mockUsers: AuthUser[] = [];
let mockOrders: Order[] = [];

const getProducts = (): Product[] => Array.from({ length: COUNT_OF_PRODUCTS }, (_, index) => createProduct(index));

const getComments = (): Comment[] => Array.from({ length: COUNT_OF_COMMENTS }, () => createComment());

const getUsers = async (): Promise<AuthUser[]> => {
  const users: AuthUser[] = [];

  for (let i = 0; i < COUNT_OF_USERS; i++) {
    const user = await createUser(i);
    users.push(user);
  }

  return users;
};

const getOrders = (): Order[] => Array.from({ length: COUNT_OF_ORDER_BALANCE }, (_, index) => createOrder(index));

const getBalances = (): Balance[] => Array.from({ length: COUNT_OF_ORDER_BALANCE }, (_, index) => createBalance(index));

const createProduct = (index: number): Product => ({
  id: productMockData["ids"][index],
  rating: generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_RATING, PRODUCT_GENERATOR_CONFIG.MAX_RATING),
  name: getRandomItem<string>(productMockData['names']),
  backgroundImage: productMockData["images"][index],
  userLevel: USER_LEVEL[getRandomItem<keyof typeof USER_LEVEL>(userLevels)] as unknown as UserLevel,
  type: PRODUCT_TYPE[getRandomItem<keyof typeof PRODUCT_TYPE>(productTypes)] as unknown as ProductType,
  duration: getRandomItem<string>(productMockData['durations']),
  price: generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_PRICE, PRODUCT_GENERATOR_CONFIG.MAX_PRICE),
  amountOfCalories: generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_CALORIES, PRODUCT_GENERATOR_CONFIG.MAX_CALORIES),
  description: productMockData["descriptions"][index],
  sex: TRAINING_SEX[getRandomItem<keyof typeof TRAINING_SEX>(trainingsSex)] as unknown as TrainingSex,
  video: 'video/test.avi',
  coach: getRandomItem<string>(productMockData['coaches']),
  isSpecial: generateRandomBoolean(),
});

const createComment = (): Comment => ({
  id: uuidV4(),
  userId: getRandomItem<string>(userMockData['ids']),
  productId: getRandomItem<string>(productMockData['ids']),
  content: getRandomItem<string>(commentMockData['contents']),
  rating: generateRandomValue(COMMENT_MIN_RATING, COMMENT_MAX_RATING),
});

const getHash = async (password: string) => {
  const salt = await genSalt(USER_SALT_ROUNDS);
  return hash(password, salt);
};

const createUser = async (index: number): Promise<AuthUser> => ({
  id: userMockData["ids"][index],
  avatar: userMockData["avatars"][index],
  description: userMockData["descriptions"][index],
  location: userMockData["location"][index] as unknown as UserLocation,
  backgroundImage: userMockData["backgroundImages"][index],
  sex: userMockData["sexes"][index] as unknown as UserSex,
  birthday: userMockData["birthdays"][index] as unknown as Date,
  login: userMockData["logins"][index],
  email: userMockData["emails"][index],
  level: userMockData["levels"][index] as unknown as UserLevel,
  trainingType: userMockData["trainingTypes"][index] as unknown as ProductType[],
  timeForTraining: userMockData["timeForTrainings"][index],
  caloriesToReset: +userMockData["caloriesToResets"][index],
  caloriesToResetPerDay: +userMockData["caloriesToResetsPerDays"][index],
  isReadyToTrain: userMockData["isReadyToTrains"][index],
  passwordHash: await getHash(USER_PASSWORD_DEFAULT)
});


const createOrder = (index: number): Order => {
  const quantity = generateRandomValue(1, 10);
  const sum = quantity * mockProducts[index].price;

  return {
    id: uuidV4(),
    type: OrderType.Membership,
    productId: mockProducts[index].id as unknown as string,
    userId: mockUsers[USER_WITH_ORDER_BALANCE_INDEX].id as unknown as string,
    price: mockProducts[index].price,
    quantity,
    sum,
    paymentType: PAYMENT_TYPE[getRandomItem<keyof typeof PAYMENT_TYPE>(paymentType)] as unknown as PaymentType
  }
};

const createBalance = (index: number): Balance => ({
  id: uuidV4(),
  userId: mockOrders[index].userId,
  productId: mockProducts[index].id as unknown as string,
  quantity: mockOrders[index].quantity
});

async function seedDb(prismaClient: PrismaClient): Promise<void> {
  mockProducts = getProducts();
  mockUsers = await getUsers();
  mockOrders = getOrders();
  const mockBalances = getBalances();
  const mockComments: Comment[] = getComments();

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
        coach: product.coach,
        isSpecial: product.isSpecial,
      }
    })
  }

  for (const comment of mockComments) {
    await prismaClient.comment.upsert({
      where: { id: comment.id },
      update: {},
      create: {
        id: comment.id,
        userId: comment.userId,
        productId: comment.productId,
        content: comment.content,
        rating: comment.rating,
      }
    })
  }

  for (const user of mockUsers) {
    await prismaClient.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        avatar: user.avatar,
        description: user.description,
        location: user.location,
        backgroundImage: user.backgroundImage,
        sex: user.sex,
        birthday: user.birthday,
        login: user.login,
        email: user.email,
        level: user.level,
        trainingType: user.trainingType,
        timeForTraining: user.timeForTraining,
        caloriesToReset: user.caloriesToReset,
        caloriesToResetPerDay: user.caloriesToResetPerDay,
        isReadyToTrain: user.isReadyToTrain,
        passwordHash: ''
      }
    })
  }

  for (const order of mockOrders) {
    await prismaClient.order.upsert({
      where: { id: order.id },
      update: {},
      create: {
        id: order.id,
        type: order.type,
        productId: order.productId,
        userId: order.userId,
        price: order.price,
        quantity: order.quantity,
        sum: order.sum,
        paymentType: order.paymentType
      }
    })
  }

  for (const balance of mockBalances) {
    await prismaClient.balance.upsert({
      where: { id: balance.id },
      update: {},
      create: {
        id: balance.id,
        userId: balance.userId,
        productId: balance.productId,
        quantity: balance.quantity,
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap(): Promise<void> {
  const prismaClient = new PrismaClient();

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
