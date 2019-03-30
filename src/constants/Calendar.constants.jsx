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
