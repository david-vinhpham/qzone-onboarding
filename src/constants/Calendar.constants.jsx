import { range } from 'lodash';

export const FETCH_PROVIDER_BY_BUSINESS_ID = {
  SUCCESS: 'FETCH_PROVIDER_BY_BUSINESS_ID_SUCCESS'
};
export const FETCH_EVENTS_BY_PROVIDERS = {
  SUCCESS: 'FETCH_EVENTS_BY_PROVIDERS_SUCCESS'
};
export const CREATE_CALENDAR_EVENT = {
  SUCCESS: 'CREATE_CALENDAR_EVENT_SUCCESS',
  FAILURE: 'CREATE_CALENDAR_EVENT_FAILURE'
};
export const CALENDAR_LOADING = 'CALENDAR_LOADING';

export const EVENT_TYPE = Object.freeze({
  APPOINTMENT: 'APPOINTMENT',
  TMP_SERVICE: 'TMP_SERVICE',
  BREAK: 'BREAK',
  CLOSED: 'CLOSED',
  WEEKEND: 'WEEKEND',
  HOLIDAY: 'HOLIDAY',
  VACATION: 'VACATION',
  TMP_EVENTS: 'TMP_EVENTS'
});

export const EVENT_TYPE_TITLE = Object.freeze({
  [EVENT_TYPE.APPOINTMENT]: 'Appointment',
  [EVENT_TYPE.BREAK]: 'Break',
  [EVENT_TYPE.CLOSED]: 'Closed',
  [EVENT_TYPE.WEEKEND]: 'Weekend',
  [EVENT_TYPE.HOLIDAY]: 'Holiday',
  [EVENT_TYPE.TMP_SERVICE]: 'Temporary service',
  [EVENT_TYPE.VACATION]: 'Vacation',
  [EVENT_TYPE.TMP_EVENTS]: 'Temporary event'
});

export const EVENT_BG_COLOR = Object.freeze({
  [EVENT_TYPE.APPOINTMENT]: {
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
  [EVENT_TYPE.TMP_EVENTS]: {
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
