import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import moment from 'moment-timezone';
import { isEmpty } from 'lodash';

import { fetchEventsByBusinessId, createNewEvent } from 'actions/calendar';
import {
  EVENT_LEVEL,
  EVENT_TYPE,
  EVENT_REPEAT_TYPE,
  REPEAT_END_TYPE
} from 'constants/Calendar.constants';
import { providerType, optionType } from 'types/global';
import Calendar from './CalendarV2';
import AddEventDialog from './AddEventDialog';
import CalendarLoading from './CalendarLoading';

class ManageCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.initialState = {
      isOpenAddDialog: false,
      addEventData: {
        eventType: '',
        repeat: {
          repeatEnd: {}
        },
        tmpService: {}
      },
      eventLevel: EVENT_LEVEL.PROVIDER
    };
    this.state = { ...this.initialState, isLoading: false };
  }

  componentDidMount() {
    this.userId = localStorage.getItem('userSub');
    if (this.userId) {
      this.setState({ isLoading: true });
      this.props
        .fetchEventsByBusinessId(this.userId)
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  closeAddDialog = () => this.setState(this.initialState);

  onClickNewEvent = (schedulerData, providerId, providerName, startTime, endTime) => {
    this.setState(() => {
      const defaultProvider = this.props.providers[0];
      const timezoneId = providerId
        ? this.props.providers.find(provider => provider.id === providerId).timezone
        : this.props.tzOptions.find(tz => tz.label.toLowerCase() === defaultProvider.timezone.toLowerCase()).label;

      const addEventData = {
        eventType: Object.values(EVENT_TYPE)[0],
        description: '',
        repeat: {
          type: Object.values(EVENT_REPEAT_TYPE)[0],
          repeatEnd: {}
        },
        timezoneId,
        serviceId: this.props.serviceOptions.length > 0 ? this.props.serviceOptions[0].value : 0,
        tmpService: {},
        ...(providerId ?
          {
            providerId,
            providerName,
            startTime,
            endTime
          } : {
            providerId: defaultProvider.id,
            providerName: defaultProvider.name,
            startTime: moment().format(),
            endTime: moment().add(1, 'hour').format()
          })
      };

      return {
        eventLevel: EVENT_LEVEL.PROVIDER,
        isOpenAddDialog: true,
        addEventData
      };
    });
  };

  convertTimeToSpecificOffset = (time, offset) => {
    const tmpTime = time.split('+');
    return `${tmpTime[0]}${offset}`;
  }

  generateRepeatPayload = (repeat, timezoneId, providerTzOffset) => {
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
      if (repeat.repeatEnd.afterOccur !== undefined) {
        repeatPayload = {
          ...repeatPayload,
          repeatEndType: REPEAT_END_TYPE.AFTER_NUM_OCCUR,
          repeatEnd: {
            afterNumOccurrences: repeat.repeatEnd.afterOccur
          }
        };
      }

      if (repeat.repeatEnd.onDate !== undefined) {
        repeatPayload = {
          ...repeatPayload,
          repeatEndType: REPEAT_END_TYPE.ON_DATE,
          repeatEnd: {
            repeatEndOn: moment.tz(
              this.convertTimeToSpecificOffset(repeat.repeatEnd.onDate, providerTzOffset),
              timezoneId
            ).unix()
          }
        };
      }
    }

    return repeatPayload;
  };

  generateTmpServicePayload = (tmpService, timezoneId, providerTzOffset) => {
    const {
      additionalInfo,
      avgServiceTime,
      breakTimeStart,
      breakTimeEnd,
      geoLocationId,
      numberOfParallelCustomer,
      serviceId
    } = tmpService;
    const providerBreakStartTime = this.convertTimeToSpecificOffset(breakTimeStart, providerTzOffset);
    const providerBreakEndTime = this.convertTimeToSpecificOffset(breakTimeEnd, providerTzOffset);

    return {
      additionalInfo: additionalInfo.length === 0 ? undefined : additionalInfo,
      avgServiceTime,
      breakTime: {
        breakStart: moment.tz(providerBreakStartTime, timezoneId).unix(),
        breakEnd: moment.tz(providerBreakEndTime, timezoneId).unix()
      },
      geoLocationId,
      numberOfParallelCustomer,
      serviceId,
      businessAdminId: this.userId
    };
  };

  generatePayload = addEventData => {
    const {
      providerId,
      startTime,
      endTime,
      eventType,
      description,
      repeat,
      tmpService,
      serviceId,
      customerEmail,
      customerFirstName,
      customerLastName,
      customerMobilePhone,
    } = addEventData;
    const providerTz = this.props.providers.find(p => p.id === providerId).timezone;
    const providerTzOffset = moment().tz(providerTz).format('Z');
    const providerStartTime = this.convertTimeToSpecificOffset(startTime, providerTzOffset);
    const providerEndTime = this.convertTimeToSpecificOffset(endTime, providerTzOffset);

    let payload = {
      description,
      providerId,
      slot: {
        startTime: moment.tz(providerStartTime, providerTz).unix(),
        endTime: moment.tz(providerEndTime, providerTz).unix()
      },
      type: eventType,
    };

    if (eventType === EVENT_TYPE.TMP_SERVICE) {
      payload = { ...payload, ...this.generateTmpServicePayload(tmpService, providerTz, providerTzOffset) };
    }

    if (repeat.type !== EVENT_REPEAT_TYPE.NEVER) {
      payload = { ...payload, ...this.generateRepeatPayload(repeat, providerTz, providerTzOffset) };
    }

    if (eventType === EVENT_TYPE.APPOINTMENT) {
      payload = {
        ...payload,
        timezoneId: providerTz,
        serviceId,
        customerEmail,
        customerFirstName,
        customerLastName,
        customerMobilePhone,
      }
    }

    return payload;
  };

  createNewEvent = addEventData => {
    this.closeAddDialog();
    this.setState({ isLoading: true });

    if (this.state.eventLevel === EVENT_LEVEL.BUSINESS) {
      this.createOrgNewEvent(addEventData);
    } else {
      this.props.createNewEvent(this.generatePayload(addEventData))
        .finally(() => this.setState({ isLoading: false }));
    }
  };

  createOrgNewEvent = addEventData => {
    const fetchMap = this.props.providers.map(provider => {
      const payload = this.generatePayload({
        ...addEventData,
        providerId: provider.id
      });
      return this.props.createNewEvent(payload);
    });

    Promise.all(fetchMap).finally(() => this.setState({ isLoading: false }));
  };

  updateEventLevel = eventLevel => this.setState({ eventLevel });

  render() {
    const { providers, tzOptions, serviceOptions } = this.props;
    const { isOpenAddDialog, eventLevel, addEventData, isLoading } = this.state;

    return (
      <>
        <Calendar providers={providers} onClickNewEvent={this.onClickNewEvent} />
        <CalendarLoading isLoading={isLoading} />
        {isOpenAddDialog && (
          <AddEventDialog
            eventLevel={eventLevel}
            providers={providers}
            isOpenAddDialog={isOpenAddDialog}
            closeAddDialog={this.closeAddDialog}
            addEventData={addEventData}
            createNewEvent={this.createNewEvent}
            updateEventLevel={this.updateEventLevel}
            tzOptions={tzOptions}
            serviceOptions={serviceOptions}
          />
        )}
      </>
    );
  }
}

ManageCalendar.propTypes = {
  providers: arrayOf(providerType).isRequired,
  fetchEventsByBusinessId: func.isRequired,
  createNewEvent: func.isRequired,
  tzOptions: arrayOf(optionType).isRequired,
  serviceOptions: arrayOf(optionType).isRequired
};

const mapStateToProps = state => ({
  providers: state.calendarManage.providers,
  isLoading: state.calendarManage.isLoading,
  tzOptions: state.calendarManage.tzOptions,
  serviceOptions: state.calendarManage.serviceOptions
});

const mapDispatchToProps = dispatch => ({
  fetchEventsByBusinessId: businessId => dispatch(fetchEventsByBusinessId(businessId)),
  createNewEvent: newEvent => dispatch(createNewEvent(newEvent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCalendar);
