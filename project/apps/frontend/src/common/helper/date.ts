import dayjs from 'dayjs';

const TimeFormatTemplate = {
  Content: 'D MMMM, HH:mm',
  Prop: 'YYYY-MM-DD HH:mm'
} as const;

const getNotificationContentDate = (rowDate: Date): string => {
  if (!rowDate) {
    return '';
  }

  return dayjs(rowDate).format(TimeFormatTemplate.Content);
};

const getNotificationPropDate = (rowDate: Date): string => {
  if (!rowDate) {
    return '';
  }

  return dayjs(rowDate).format(TimeFormatTemplate.Prop);
};

export {
  getNotificationContentDate,
  getNotificationPropDate,
}
