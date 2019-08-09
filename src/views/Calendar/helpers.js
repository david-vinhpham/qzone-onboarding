import moment from 'moment-timezone';
import { isEmpty } from 'lodash';
import { EVENT_REPEAT_TYPE, REPEAT_END_TYPE, EVENT_LEVEL, EVENT_TYPE } from 'constants/Calendar.constants';

export const generateTmpServicePayload = (tmpService, providerTzOffset) => {
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
          repeatOn: repeat.everyDate[0]
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

const generatePayload = (addEventData, providers) => {
  const {
    providerId,
    startTime,
    endTime,
    eventType,
    description,
    repeat,
    tmpService,
    location,
    serviceId,
    customerEmail,
    customerFirstName,
    customerLastName,
    customerMobilePhone,
  } = addEventData;
  const providerTz = providers.find(p => p.id === providerId).timezone;
  const providerTzOffset = moment().tz(providerTz).format('Z');

  let payload = {
    description,
    providerId,
    slot: {
      startTime: moment(startTime).utcOffset(providerTzOffset, true).unix(),
      endTime: moment(endTime).utcOffset(providerTzOffset, true).unix()
    },
    type: eventType,
  };

  if (eventType === EVENT_TYPE.TMP_SERVICE) {
    payload = { ...payload, ...generateTmpServicePayload(tmpService, providerTzOffset) };
  }

  if (repeat.type !== EVENT_REPEAT_TYPE.NEVER) {
    payload = { ...payload, ...generateRepeatPayload(repeat, providerTzOffset) };
  }

  if (eventType === EVENT_TYPE.APPOINTMENT) {
    payload = {
      ...payload,
      timezoneId: providerTz,
      location,
      serviceId,
      customerEmail,
      customerFirstName,
      customerLastName,
      customerMobilePhone,
    }
  }

  return payload;
};

const createOrgNewEvent = (addEventData, providers, createNewEventAction) => {
  const fetchMap = providers.map(provider => {
    const payload = generatePayload(
      { ...addEventData, providerId: provider.id },
      providers
    );
    return createNewEventAction(payload);
  });

  Promise.all(fetchMap);
};

export const createNewEventHelper = (
  { addEventData, eventLevel },
  providers,
  createNewEventAction
) => {
  if (eventLevel === EVENT_LEVEL.BUSINESS) {
    createOrgNewEvent(addEventData, providers, createNewEventAction);
  } else {
    createNewEventAction(generatePayload(addEventData, providers));
  }
};
