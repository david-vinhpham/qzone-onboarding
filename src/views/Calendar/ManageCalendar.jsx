import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import moment from 'moment-timezone';

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
import { eUserType } from 'constants.js';

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
      ? { isOpenAddDialog: true, ...props.history.location.state.prevState }
      : { ...this.initialState };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userSub');
    if (userId) {
      if (this.props.userDetail.userType === eUserType.provider) {
        this.props.fetchEventsByProviderId(userId);
        this.props.fetchServiceOptionsByBusinessAdminId(this.props.userDetail.providerInformation.businessId);
        this.props.fetchProvidersByBusinessIdSuccess([this.props.userDetail]);
      } else {
        this.props.fetchProvidersByBusinessId(userId);
        this.props.fetchServiceOptionsByBusinessAdminId(userId);
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
      const addEventData = {
        eventType: EVENT_TYPE.TMP_SERVICE,
        description: '',
        repeat: { type: Object.values(EVENT_REPEAT_TYPE)[0], repeatEnd: {} },
        timezoneId: chosenProvider.timezone,
        providerId: chosenProvider.id,
        providerName: chosenProvider.name,
        serviceId: this.props.serviceOptions.length > 0 ? this.props.serviceOptions[0].value : 0,
        tmpService: {},
        startTime: moment(startTime).format(),
        endTime: moment(endTime).format(),
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
    const { providers, tzOptions, serviceOptions, isLoading, userDetail, history } = this.props;
    const { isOpenAddDialog, eventLevel, addEventData } = this.state;

    return (
      <>
        <Calendar providers={providers} onClickNewEvent={this.onClickNewEvent} userDetail={userDetail} />
        <CalendarLoading isLoading={isLoading} />
        {isOpenAddDialog && (
          <AddEventDialog
            userDetail={userDetail}
            eventLevel={eventLevel}
            providers={providers}
            isOpenAddDialog={isOpenAddDialog}
            closeAddDialog={this.closeAddDialog}
            addEventData={addEventData}
            createNewEvent={this.onCreateNewEvent}
            tzOptions={tzOptions}
            serviceOptions={serviceOptions}
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
  fetchGeoLocationOptions: func.isRequired,
  fetchServiceOptionsByBusinessAdminId: func.isRequired,
  fetchTimezoneOptions: func.isRequired,
  userDetail: userDetailType.isRequired,
  fetchEventsByProviderId: func.isRequired,
  fetchProvidersByBusinessIdSuccess: func.isRequired,
  history: historyType.isRequired
};

const mapStateToProps = state => ({
  providers: state.calendarManage.providers,
  isLoading: state.calendarManage.isLoading,
  tzOptions: state.options.timezone.tzOptions,
  serviceOptions: state.options.service.serviceOptions,
  userDetail: state.user.userDetail,
});

const mapDispatchToProps = {
  createNewEvent,
  fetchGeoLocationOptions,
  fetchServiceOptionsByBusinessAdminId,
  fetchTimezoneOptions,
  fetchProvidersByBusinessId,
  fetchEventsByProviderId,
  fetchProvidersByBusinessIdSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCalendar);
