import moment from 'moment-timezone';
import { isEmpty } from 'lodash';
import { EVENT_REPEAT_TYPE, REPEAT_END_TYPE } from 'constants/Calendar.constants';

export const generateTmpServicePayload = (tmpService, providerTzOffset, businessAdminId) => {
  const {
    additionalInfo,
    avgServiceTime,
    breakTimeStart,
    breakTimeEnd,
    geoLocationId,
    numberOfParallelCustomer,
    serviceId
  } = tmpService;
  return {
    additionalInfo: additionalInfo.length === 0 ? undefined : additionalInfo,
    avgServiceTime,
    breakTime: {
      breakStart: moment(breakTimeStart).utcOffset(providerTzOffset, true).unix(),
      breakEnd: moment(breakTimeEnd).utcOffset(providerTzOffset, true).unix()
    },
    geoLocationId,
    numberOfParallelCustomer,
    serviceId,
    businessAdminId
  };
};

export const generateRepeatPayload = (repeat, providerTzOffset) => {
  let repeatPayload = {};

  if (repeat.type === EVENT_REPEAT_TYPE.DAILY) {
    repeatPayload = {
      ...repeatPayload,
      repeatType: EVENT_REPEAT_TYPE.DAILY,
      repeat: {
        repeatDaily: {
          repeatEvery: repeat.every
        }
      }
    };
  }

  if (repeat.type === EVENT_REPEAT_TYPE.WEEKLY) {
    repeatPayload = {
      ...repeatPayload,
      repeatType: EVENT_REPEAT_TYPE.WEEKLY,
      repeat: {
        repeatWeekly: {
          repeatEveryNumWeeks: repeat.every,
          repeatOn: repeat.everyDate
        }
      }
    };
  }

  if (isEmpty(repeat.repeatEnd)) {
    repeatPayload = {
      ...repeatPayload,
      repeatEndType: REPEAT_END_TYPE.NEVER
    };
  } else {
    if (repeat.repeatEnd.afterOccur) {
      repeatPayload = {
        ...repeatPayload,
        repeatEndType: REPEAT_END_TYPE.AFTER_NUM_OCCUR,
        repeatEnd: {
          afterNumOccurrences: repeat.repeatEnd.afterOccur
        }
      };
    }

    if (repeat.repeatEnd.onDate) {
      repeatPayload = {
        ...repeatPayload,
        repeatEndType: REPEAT_END_TYPE.ON_DATE,
        repeatEnd: {
          repeatEndOn: moment(repeat.repeatEnd.onDate).utcOffset(providerTzOffset, true).unix()
        }
      };
    }
  }

  return repeatPayload;
};
