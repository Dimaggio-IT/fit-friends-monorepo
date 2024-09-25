import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';

const getDate = () => {
  return dayjs().toISOString();
}

type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
type TimeAndUnit = { value: number; unit: DateTimeUnit };

function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

function fillDto<T, V extends []>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit }
}

const generateRandomValue = (min: number, max: number, numAfterDigit = 0): number =>
  Number(((Math.random() * (max - min)) + min).toFixed(numAfterDigit));

const generateRandomBoolean = (): boolean =>
  (generateRandomValue(0, 1)) ? true : false;

function getRandomItems<T>(items: T[], length?: number): T[] {
  const startPosition = length ? 0 : generateRandomValue(0, items.length - 1);
  const endPosition = length ?? (startPosition + generateRandomValue(startPosition, items.length));

  return items.slice(startPosition, endPosition);
}

const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export {
  getDate,
  parseTime,
  generateRandomValue,
  generateRandomBoolean,
  getRandomItems,
  getRandomItem,
  getErrorMessage,
  fillDto,
  type DateTimeUnit,
  type TimeAndUnit,
}
