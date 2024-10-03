import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import {
  generateRandomBoolean,
  generateRandomValue,
  getRandomItem
} from '../helper/common';
import {
  RATINGS,
  COUNT_OF_COMMENTS,
  COUNT_OF_ORDERS,
  COUNT_OF_BALANCES,
  COUNT_OF_PRODUCTS,
  COUNT_OF_USERS,
  COUNT_OF_NOTIFICATIONS,
  PAYMENT_TYPE,
  PRODUCT_GENERATOR_CONFIG,
  PRODUCT_TYPE,
  TRAINING_SEX,
  USER_LEVEL,
  USER_PASSWORD_DEFAULT,
  paymentType,
  productTypes,
  trainingsSex,
  userLevels,
} from './constant';
import {
  commentMockData,
  notificationMockData,
  productMockData,
  userMockData
} from './mock-data';
import { IComment } from '../interface/comment.interface';
import { IProduct } from '../interface/product.interface';
import {
  UserLevel,
  UserRole,
} from '../enum/user.enum';
import { WorkoutType } from '../enum/shared.enum';
import { TrainingSex } from '../enum/product.enum';
import { v4 as uuidV4 } from 'uuid';
import { IAuthUser } from '../interface/auth-user.interface';
import { USER_SALT_ROUNDS } from '../constant/user.constant';
import { faker } from '@faker-js/faker';
import { IFriend } from '../interface/friend.interface';
import { IOrder } from '../interface/order.interface';
import { OrderType, PaymentType } from '../enum/order.enum';
import { IBalance } from '../interface/balance.interface';
import { INotification } from '../interface/notification.interface';

let mockProducts: IProduct[] = [];
let mockUsers: IAuthUser[] = [];
let mockNotifications: INotification[] = [];

const getHash = async (password: string) => {
  const salt = await genSalt(USER_SALT_ROUNDS);
  return hash(password, salt);
};

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

const getOrders = (): IOrder[] => Array.from({ length: COUNT_OF_ORDERS }, () => createOrder());

const getBalances = (): IBalance[] => Array.from({ length: COUNT_OF_BALANCES }, () => createBalance());

const getNotifications = (): INotification[] => Array.from({ length: COUNT_OF_NOTIFICATIONS }, () => createNotification());


const createProduct = (index: number): IProduct => {
  const productId = productMockData["ids"][index];
  const rating = generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_RATING, PRODUCT_GENERATOR_CONFIG.MAX_RATING);
  const name = getRandomItem<string>(productMockData['names']);
  const backgroundImage = productMockData["images"][index];
  const userLevel = USER_LEVEL[getRandomItem<keyof typeof USER_LEVEL>(userLevels)] as unknown as UserLevel;
  const type = PRODUCT_TYPE[getRandomItem<keyof typeof PRODUCT_TYPE>(productTypes)] as unknown as WorkoutType;
  const duration = getRandomItem<string>(productMockData['durations']);
  const price = generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_PRICE, PRODUCT_GENERATOR_CONFIG.MAX_PRICE);
  const amountOfCalories = generateRandomValue(PRODUCT_GENERATOR_CONFIG.MIN_CALORIES, PRODUCT_GENERATOR_CONFIG.MAX_CALORIES);
  const description = productMockData["descriptions"][index];
  const sex = TRAINING_SEX[getRandomItem<keyof typeof TRAINING_SEX>(trainingsSex)] as unknown as TrainingSex;
  const video = 'video/test.avi';
  const randomCoachUser = getRandomCoach();
  const coachId = (randomCoachUser.id as string);

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
  rating: generateRandomValue(RATINGS.MIN, RATINGS.MAX),
});

const createFriend = (userId: string, friendId: string): IFriend => ({
  id: uuidV4(),
  userId,
  friendId,
  isConfirmed: generateRandomBoolean(),
});

const createUser = async (index: number): Promise<IAuthUser> => {
  let role: UserRole;
  const friends: IFriend[] = [];
  const orders: IOrder[] = getOrders();
  const balances: IBalance[] = getBalances();
  const userId = userMockData["ids"][index];
  const avatar = faker.helpers.arrayElement(userMockData["avatars"]);
  const description = faker.helpers.arrayElement(userMockData["descriptions"]);
  const location = faker.helpers.arrayElement(userMockData["location"]);
  const backgroundImage = faker.helpers.arrayElement(userMockData["backgroundImages"]);
  const sex = faker.helpers.arrayElement(userMockData["sexes"]);
  const birthday = faker.helpers.arrayElement(userMockData["birthdays"]) as unknown as Date;
  const login = faker.helpers.arrayElement(userMockData["logins"]);
  const email = faker.helpers.arrayElement(userMockData["emails"]);
  const level = faker.helpers.arrayElement(userMockData["levels"]);
  const trainingType = faker.helpers.arrayElements(userMockData["trainingTypes"],
    { min: 1, max: 3 },
  );
  const timeForTraining = faker.helpers.arrayElement(userMockData["timeForTrainings"]);
  const caloriesToReset = +faker.helpers.arrayElement(userMockData["caloriesToResets"]);
  const caloriesToResetPerDay = +faker.helpers.arrayElement(userMockData["caloriesToResetsPerDays"]);
  const isReadyToTrain = faker.helpers.arrayElement(userMockData["isReadyToTrains"]);
  const passwordHash = await getHash(USER_PASSWORD_DEFAULT);

  if (index === 0) {
    role = UserRole.Coach;
  } else if (index === 1) {
    role = UserRole.Athlete;
  } else {
    role = (getRandomItem<string>(userMockData["role"]) as unknown as UserRole);
  }

  const oneFriendId = userMockData["ids"][index + 1];
  const twoFriendId = userMockData["ids"][index + 2];

  if (oneFriendId !== undefined) {
    friends.push(createFriend(userId, oneFriendId));
  }

  if (twoFriendId !== undefined) {
    friends.push(createFriend(userId, twoFriendId));
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
    orders,
    balances,
  }
};

const createOrder = (): IOrder => {
  const QUANTITY = { MIN: 1, MAX: 10 } as const;
  const quantity = faker.helpers.rangeToNumber({ min: QUANTITY.MIN, max: QUANTITY.MAX });
  const price = faker.helpers.rangeToNumber({ min: PRODUCT_GENERATOR_CONFIG.MIN_PRICE, max: PRODUCT_GENERATOR_CONFIG.MAX_PRICE });
  const sum = quantity * price;
  const randomProductId = faker.helpers.arrayElement(productMockData["ids"]);
  const randomUserId = faker.helpers.arrayElement(userMockData["ids"]);

  return {
    id: uuidV4(),
    type: OrderType.Membership,
    productId: randomProductId,
    userId: randomUserId,
    price: price,
    quantity,
    sum,
    paymentType: PAYMENT_TYPE[getRandomItem<keyof typeof PAYMENT_TYPE>(paymentType)] as unknown as PaymentType
  }
};

const createBalance = (): IBalance => {
  const QUANTITY = { MIN: 1, MAX: 50 } as const;
  const quantity = faker.helpers.rangeToNumber({ min: QUANTITY.MIN, max: QUANTITY.MAX });

  return {
    id: uuidV4(),
    userId: faker.helpers.arrayElement(userMockData["ids"]),
    productId: faker.helpers.arrayElement(productMockData["ids"]),
    quantity
  }
};

const createNotification = (): INotification => ({
  id: uuidV4(),
  userTargetId: faker.helpers.arrayElement(userMockData["ids"]),
  content: faker.helpers.arrayElement(notificationMockData["contents"]),
});

async function seedDb(prismaClient: PrismaClient): Promise<void> {
  mockUsers = await getUsers();
  mockProducts = getProducts();
  mockNotifications = getNotifications();

  for (const user of mockUsers) {
    const friends = user.friends?.map((friend) => ({
      friendId: friend.friendId,
      isConfirmed: friend.isConfirmed
    })) ?? [];
    const orders = user.orders?.map((order) => ({
      type: order.type,
      productId: order.productId,
      price: order.price,
      quantity: order.quantity,
      sum: order.sum,
      paymentType: order.paymentType
    })) ?? [];
    const randomCoach = getRandomCoach();
    const balances = user.balances?.map((balance) => ({
      coachId: randomCoach.id as string,
      productId: balance.productId,
      quantity: balance.quantity
    })) ?? [];

    await prismaClient.user.create({
      data: {
        id: user.id,
        avatar: user.avatar,
        description: user.description,
        location: user.location,
        backgroundImage: user.backgroundImage,
        sex: user.sex,
        role: user.role,
        birthday: user.birthday,
        login: user.login,
        email: user.email,
        level: user.level,
        trainingType: user.trainingType,
        timeForTraining: user.timeForTraining,
        caloriesToReset: user.caloriesToReset,
        caloriesToResetPerDay: user.caloriesToResetPerDay,
        isReadyToTrain: user.isReadyToTrain,
        passwordHash: '',
        friends: {
          create: [
            ...friends
          ],
        },
        orders: {
          create: [
            ...orders
          ],
        },
        balances: {
          create: [
            ...balances
          ],
        }
      }
    });
  }

  for (const product of mockProducts) {
    const comments = product.comments?.map((comment) => ({
      userId: comment.userId,
      content: comment.content,
      rating: comment.rating
    })) ?? [];

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
            ...comments
          ],
        }
      }
    });
  }

  for (const notification of mockNotifications) {
    await prismaClient.notification.upsert({
      where: { id: notification.id },
      update: {},
      create: {
        id: notification.id,
        userTargetId: notification.userTargetId,
        content: notification.content,
      }
    });
  }

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
