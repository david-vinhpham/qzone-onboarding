import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import moment from 'moment-timezone';
import { get } from 'lodash';

import { createNewEvent, fetchProvidersByBusinessId, fetchEventsByProviderId, fetchProvidersByBusinessIdSuccess } from 'actions/calendar';
import {
  EVENT_LEVEL,
  EVENT_TYPE,
  EVENT_REPEAT_TYPE
} from 'constants/Calendar.constants';
import { providerType, optionType, userDetailType, historyType } from 'types/global';
import Calendar from './CalendarV2';
import AddEventDialog from './AddEventDialog';
import CalendarLoading from './CalendarLoading';
import { createNewEventHelper } from './helpers';
import { fetchGeoLocationOptions } from 'actions/geoOptions';
import { fetchServiceOptionsByBusinessAdminId } from 'actions/serviceOptions';
import { fetchTimezoneOptions } from 'actions/timezoneOptions';
import { eUserType, weekDays } from 'constants.js';
import { fetchSurveyOptionsByAssessorId } from 'actions/surveyOptions';

const today = weekDays[moment().day()];

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

    this.state = props.history.location.state
      ? {
        isOpenAddDialog: true,
        addEventData: props.history.location.state.prevState.addEventData,
        eventLevel: props.history.location.state.prevState.eventLevel,
      }
      : { ...this.initialState };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userSub');
    if (userId) {
      if (this.props.userDetail.userType === eUserType.provider) {
        this.props.fetchEventsByProviderId(userId);
        this.props.fetchServiceOptionsByBusinessAdminId(this.props.userDetail.providerInformation.businessId);
        this.props.fetchSurveyOptionsByAssessorId(this.props.userDetail.providerInformation.businessId);
        this.props.fetchProvidersByBusinessIdSuccess([this.props.userDetail]);
      } else {
        this.props.fetchProvidersByBusinessId(userId);
        this.props.fetchServiceOptionsByBusinessAdminId(userId);
        this.props.fetchSurveyOptionsByAssessorId(userId);
      }
      this.props.fetchGeoLocationOptions();
      this.props.fetchTimezoneOptions();
    }
  }

  closeAddDialog = () => this.setState(this.initialState);

  onClickNewEvent = (providerDetail, startTime, endTime) => {
    this.setState(() => {
      const defaultProvider = this.props.providers[0];
      const chosenProvider = providerDetail === 'none' ? defaultProvider : providerDetail;
      const todayWorkingHour = chosenProvider.workingHours.find(wh => wh.day === today);
      const serviceId = get(this.props.serviceOptions, '0.value', 0);
      const serviceDuration = get(this.props.serviceOptions, '0.duration', 0);
      const addEventData = {
        eventType: EVENT_TYPE.TMP_SERVICE,
        description: '',
        repeat: { type: Object.values(EVENT_REPEAT_TYPE)[0], repeatEnd: {} },
        timezoneId: chosenProvider.timezone,
        providerId: chosenProvider.id,
        providerName: chosenProvider.name,
        serviceId,
        tmpService: {
          avgServiceTime: serviceDuration,
          breakTimeStart: moment(startTime).hour(12).minute(0).second(0).format(),
          breakTimeEnd: moment(endTime).hour(13).minute(0).second(0).format(),
          geoLocationId: get(this.props.geoOptions, '0.value', 0),
          numberOfParallelCustomer: 1,
          serviceId,
          surveyId: 'none',
          privacy: true
        },
        startTime: moment(startTime)
          .hour(todayWorkingHour.startTime.hour)
          .minute(todayWorkingHour.startTime.minute)
          .second(0)
          .format(),
        endTime: moment(endTime)
          .hour(todayWorkingHour.endTime.hour)
          .minute(todayWorkingHour.endTime.minute)
          .second(0)
          .format(),
      };

      return {
        eventLevel: EVENT_LEVEL.PROVIDER,
        isOpenAddDialog: true,
        addEventData
      };
    });
  };

  onCreateNewEvent = (payload) => {
    this.closeAddDialog();
    createNewEventHelper(payload, this.props.providers, this.props.createNewEvent);
  };

  render() {
    const { isLoading, history } = this.props;
    const { isOpenAddDialog, eventLevel, addEventData } = this.state;

    return (
      <>
        <Calendar onClickNewEvent={this.onClickNewEvent} />
        <CalendarLoading isLoading={isLoading} />
        {isOpenAddDialog && (
          <AddEventDialog
            eventLevel={eventLevel}
            isOpenAddDialog={isOpenAddDialog}
            closeAddDialog={this.closeAddDialog}
            addEventData={addEventData}
            createNewEvent={this.onCreateNewEvent}
            history={history}
          />
        )}
      </>
    );
  }
}

ManageCalendar.propTypes = {
  providers: arrayOf(providerType).isRequired,
  fetchProvidersByBusinessId: func.isRequired,
  createNewEvent: func.isRequired,
  tzOptions: arrayOf(optionType).isRequired,
  serviceOptions: arrayOf(optionType).isRequired,
  geoOptions: arrayOf(optionType).isRequired,
  fetchGeoLocationOptions: func.isRequired,
  fetchServiceOptionsByBusinessAdminId: func.isRequired,
  fetchTimezoneOptions: func.isRequired,
  userDetail: userDetailType.isRequired,
  fetchEventsByProviderId: func.isRequired,
  fetchProvidersByBusinessIdSuccess: func.isRequired,
  history: historyType.isRequired,
  fetchSurveyOptionsByAssessorId: func.isRequired
};

const mapStateToProps = state => ({
  providers: state.calendarManage.providers,
  isLoading: state.calendarManage.isLoading,
  tzOptions: state.options.timezone.tzOptions,
  serviceOptions: state.options.service.serviceOptions,
  geoOptions: state.options.geo.geoOptions,
  userDetail: state.user.userDetail,
});

const mapDispatchToProps = {
  createNewEvent,
  fetchGeoLocationOptions,
  fetchServiceOptionsByBusinessAdminId,
  fetchTimezoneOptions,
  fetchProvidersByBusinessId,
  fetchEventsByProviderId,
  fetchProvidersByBusinessIdSuccess,
  fetchSurveyOptionsByAssessorId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCalendar);
