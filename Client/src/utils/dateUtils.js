import dayjs from 'dayjs';

export const getLabelFromTimeStamp = (timeStamp, format = 'YYYY-MM-DD', emptyLabel = '????-??-??') => {
  if (!timeStamp) {
    return emptyLabel
  }
  return dayjs(timeStamp).format(format)
}