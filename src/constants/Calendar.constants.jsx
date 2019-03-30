import { range } from 'lodash';

export const FETCH_PROVIDER_BY_ORG = {
  SUCCESS: 'FETCH_PROVIDER_BY_ORG_SUCCESS'
};
export const FETCH_NORM_EVENTS_BY_PROVIDER = {
  SUCCESS: 'FETCH_NORM_EVENTS_BY_PROVIDER_SUCCESS'
};
export const CREATE_NORM_EVENT = {
  SUCCESS: 'CREATE_NORM_EVENT_SUCCESS'
};
export const CALENDAR_LOADING = 'CALENDAR_LOADING';

export const EVENT_TYPE = Object.freeze({
  APPOINTMENT: 'APPOINTMENT',
  BREAK: 'BREAK',
  CLOSED: 'CLOSED',
  WEEKEND: 'WEEKEND',
  HOLIDAY: 'HOLIDAY',
  SPECIAL: 'SPECIAL',
  VACATION: 'VACATION'
});

export const EVENT_TYPE_TITLE = Object.freeze({
  [EVENT_TYPE.APPOINTMENT]: 'Appointment',
  [EVENT_TYPE.BREAK]: 'Break',
  [EVENT_TYPE.CLOSED]: 'Closed',
  [EVENT_TYPE.WEEKEND]: 'Weekend',
  [EVENT_TYPE.HOLIDAY]: 'Holiday',
  [EVENT_TYPE.SPECIAL]: 'Special',
  [EVENT_TYPE.VACATION]: 'Vacation'
});

export const EVENT_BG_COLOR = Object.freeze({
  [EVENT_TYPE.APPOINTMENT]: {
    color: '#fff',
    backgroundColor: '#1589ff'
  },
  [EVENT_TYPE.WEEKEND]: {
    color: '#000',
    backgroundColor: '#efefef'
  },
  [EVENT_TYPE.CLOSED]: {
    color: '#000',
    backgroundColor: '#efefef'
  },
  [EVENT_TYPE.BREAK]: {
    color: '#fff',
    backgroundColor: '#adadad'
  },
  [EVENT_TYPE.HOLIDAY]: {
    color: '#fff',
    backgroundColor: '#4c4c4c'
  },
  [EVENT_TYPE.VACATION]: {
    color: '#fff',
    backgroundColor: '#4c4c4c'
  },
  [EVENT_TYPE.SPECIAL]: {}
});

export const EVENT_LEVEL = Object.freeze({
  ORGANIZATION: 'ORGANIZATION',
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
