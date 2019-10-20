import { range } from 'lodash';

export const PROVIDER_EVENT_TYPE = ['TMP_SERVICE', 'BREAK', 'CUSTOMER_APPOINTMENT'];

export const EVENT_TYPE = Object.freeze({
  CUSTOMER_APPOINTMENT: 'CUSTOMER_APPOINTMENT',
  TMP_SERVICE: 'TMP_SERVICE',
  BREAK: 'BREAK',
  CLOSED: 'CLOSED',
  WEEKEND: 'WEEKEND',
  HOLIDAY: 'HOLIDAY',
  VACATION: 'VACATION',
  APPOINTMENT: 'APPOINTMENT'
});

export const EVENT_TYPE_TITLE = Object.freeze({
  [EVENT_TYPE.CUSTOMER_APPOINTMENT]: 'Appointment',
  [EVENT_TYPE.BREAK]: 'Break',
  [EVENT_TYPE.CLOSED]: 'Closed',
  [EVENT_TYPE.WEEKEND]: 'Weekend',
  [EVENT_TYPE.HOLIDAY]: 'Holiday',
  [EVENT_TYPE.TMP_SERVICE]: 'Temporary service',
  [EVENT_TYPE.VACATION]: 'Vacation',
  [EVENT_TYPE.APPOINTMENT]: 'Booking event'
});

export const EVENT_BG_COLOR = Object.freeze({
  [EVENT_TYPE.CUSTOMER_APPOINTMENT]: {
    color: '#fff',
    backgroundColor: '#1589ff'
  },
  [EVENT_TYPE.WEEKEND]: {
    color: '#fff',
    backgroundColor: '#ff4040'
  },
  [EVENT_TYPE.CLOSED]: {
    color: '#fff',
    backgroundColor: '#999'
  },
  [EVENT_TYPE.BREAK]: {
    color: '#fff',
    backgroundColor: '#adadad'
  },
  [EVENT_TYPE.HOLIDAY]: {
    color: '#fff',
    backgroundColor: '#ff9800'
  },
  [EVENT_TYPE.VACATION]: {
    color: '#fff',
    backgroundColor: '#4c4c4c'
  },
  [EVENT_TYPE.TMP_SERVICE]: {
    color: '#000',
    backgroundColor: '#ffeb3b'
  },
  [EVENT_TYPE.APPOINTMENT]: {
    color: '#fff',
    backgroundColor: '#4caf50'
  }
});

export const EVENT_LEVEL = Object.freeze({
  BUSINESS: 'BUSINESS',
  PROVIDER: 'PROVIDER'
});

export const EVENT_REPEAT_TYPE = Object.freeze({
  NEVER: 'Never',
  DAILY: 'Daily',
  WEEKLY: 'Weekly'
});

export const REPEAT_EVERY_DEF = {
  [EVENT_REPEAT_TYPE.WEEKLY]: range(1, 4),
  [EVENT_REPEAT_TYPE.DAILY]: range(1, 7)
};

export const REPEAT_DATE_DEF = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const REPEAT_END_TYPE = Object.freeze({
  NEVER: 'Never',
  AFTER_NUM_OCCUR: 'AfterNumOccurrences',
  ON_DATE: 'On'
});
