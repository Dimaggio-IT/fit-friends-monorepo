import { PrismaClient } from '@prisma/client';
import { generateRandomBoolean, generateRandomValue, getRandomItem } from '../helper/common';
import { PRODUCT_GENERATOR_CONFIG, PRODUCT_TYPE, TRAINING_SEX, USER_LEVEL, productTypes, trainingsSex, userLevels } from './constant';
import { productMockData } from './mock-data';
import { Product } from '../interface/product.interface';
import { UserLevel } from '../enum/user.enum';
import { ProductType } from '../enum/shared.enum';
import { TrainingSex } from '../enum/product.enum';

const COUNT_OF_PRODUCTS = 12;

const getProducts = (): Product[] => Array.from({ length: COUNT_OF_PRODUCTS }, (_, index) => createProduct(index));

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

// function getComments() {

// }

// function getBalances() {

// }


// function getUsers() {

// }


// function getOrders() {

// }

async function seedDb(prismaClient: PrismaClient): Promise<void> {
  const mockProducts: Product[] = getProducts();

  for (const product of mockProducts) {
    await prismaClient.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        rating: product.rating,
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
