import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, string, bool, any } from 'prop-types';
import moment from 'moment-timezone';
import { get } from 'lodash';

import { createNewEvent, fetchProvidersByBusinessId, fetchEventsByProviderId, fetchProvidersByBusinessIdSuccess, setBookingSlots, rescheduleBookingEvent, cancelBookingEvent, getSlotsByTmpServiceId, deleteEvent } from 'actions/calendar';
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
import RescheduleDialog from './RescheduleDialog';
import CustomModal from 'components/CustomModal/CustomModal';
import ListView from './ListView';
import styles from './ManageCalendar.module.scss';

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

    const selectedProvider = props.userDetail.userType === eUserType.provider
      ? {
        id: props.userDetail.id,
        name: `${props.userDetail.familyName || ''} ${props.userDetail.givenName}`,
        timezone: props.userDetail.providerInformation.timeZoneId,
        workingHours: props.userDetail.providerInformation.workingHours
      } : 'none';

    this.state = props.history.location.state
      ? {
        isOpenAddDialog: true,
        addEventData: props.history.location.state.prevState.addEventData,
        eventLevel: props.history.location.state.prevState.eventLevel,
        selectedProvider,
        deletedBookingEventId: '',
        showRescheduleDialog: false,
        deletedEvent: null
      } : {
        ...this.initialState,
        selectedProvider,
        deletedBookingEventId: '',
        showRescheduleDialog: false,
        deletedEvent: null
      };
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

  onCloseRescheduleDialog = () => {
    this.props.setBookingSlots({ bookingSlots: [], bookingEventId: '' });
    this.setState({ showRescheduleDialog: false });
  }

  onRescheduleSlot = (selectedSlot) => () => {
    const rescheduledData = { eventId: this.props.bookingEventId, newAvailabilityId: selectedSlot.id };
    this.onCloseRescheduleDialog();
    this.props.rescheduleBookingEvent(rescheduledData, this.state.selectedProvider.id);
  }

  onSelectProvider = ({ target: { value } }) => {
    this.setState({ selectedProvider: value });
    if (value !== 'none') { this.props.fetchEventsByProviderId(value.id); }
  }

  onCancelBookingEvent = (bookingEventId) => {
    this.setState({ deletedBookingEventId: bookingEventId });
  }

  onCloseCancelBookingEventDialog = () => {
    this.setState({ deletedBookingEventId: '' });
  }

  onConfirmCancelBookingEvent = () => {
    this.props.cancelBookingEvent(this.state.deletedBookingEventId, this.state.selectedProvider.id);
    this.onCloseCancelBookingEventDialog();
  }

  onClickUpdateEvent = (tmpServiceId, eventId) => {
    this.props.getSlotsByTmpServiceId(tmpServiceId, eventId);
    this.setState({ showRescheduleDialog: true });
  }

  onCloseDeleteEventDialog = () => {
    this.setState({ deletedEvent: null });
  }

  onConfirmDeleteEvent = () => {
    this.props.deleteEvent(this.state.deletedEvent);
    this.onCloseDeleteEventDialog();
  }

  onDeleteEvent = (event) => {
    this.setState({ deletedEvent: event });
  }

  render() {
    const { isLoading, history, bookingSlots, userDetail, providers, isFetchBookingSlots, calendarData } = this.props;
    const {
      isOpenAddDialog, eventLevel, addEventData,
      selectedProvider, deletedBookingEventId, showRescheduleDialog,
      deletedEvent
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <CalendarLoading isLoading={isLoading} />
        {showRescheduleDialog && <RescheduleDialog
          isFetchBookingSlots={isFetchBookingSlots}
          bookingSlots={bookingSlots}
          onClose={this.onCloseRescheduleDialog}
          onReschedule={this.onRescheduleSlot}
        />}
        {!!deletedBookingEventId &&
          <CustomModal
            openModal={!!deletedBookingEventId}
            onClose={this.onCloseCancelBookingEventDialog}
            onConfirm={this.onConfirmCancelBookingEvent}
            title="Cancel booking event"
            message="Are you sure to cancel this event?"
            closeButtonLabel="Discard"
            confirmButtonLabel="OK"
          />}
        {!!deletedEvent &&
          <CustomModal
            openModal={!!deletedEvent}
            onClose={this.onCloseDeleteEventDialog}
            onConfirm={this.onConfirmDeleteEvent}
            title="Cancel event"
            message="Are you sure to cancel this event?"
            closeButtonLabel="Discard"
            confirmButtonLabel="OK"
          />}
        {isOpenAddDialog && (
          <AddEventDialog
            eventLevel={eventLevel}
            isOpenAddDialog={isOpenAddDialog}
            closeAddDialog={this.closeAddDialog}
            addEventData={addEventData}
            createNewEvent={this.onCreateNewEvent}
            history={history}
          />)}
        <Calendar
          onClickNewEvent={this.onClickNewEvent}
          onClickUpdateEvent={this.onClickUpdateEvent}
          onSelectProvider={this.onSelectProvider}
          selectedProvider={selectedProvider}
          userDetail={userDetail}
          providers={providers}
          onCancelBookingEvent={this.onCancelBookingEvent}
          calendarData={calendarData}
          onDeleteEvent={this.onDeleteEvent}
        />
        <ListView
          calendarData={selectedProvider === 'none' ? [] : calendarData}
          onClickUpdateEvent={this.onClickUpdateEvent}
          onCancelBookingEvent={this.onCancelBookingEvent}
          onDeleteEvent={this.onDeleteEvent}
        />
      </div>
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
  fetchSurveyOptionsByAssessorId: func.isRequired,
  setBookingSlots: func.isRequired,
  bookingEventId: string.isRequired,
  rescheduleBookingEvent: func.isRequired,
  cancelBookingEvent: func.isRequired,
  isFetchBookingSlots: bool.isRequired,
  calendarData: arrayOf(any).isRequired,
  getSlotsByTmpServiceId: func.isRequired,
  deletedEvent: func.isRequired
};

const mapStateToProps = state => ({
  providers: state.manageCalendar.providers,
  isLoading: state.manageCalendar.isLoading,
  tzOptions: state.options.timezone.tzOptions,
  serviceOptions: state.options.service.serviceOptions,
  geoOptions: state.options.geo.geoOptions,
  userDetail: state.user.userDetail,
  bookingSlots: state.manageCalendar.bookingSlots.filter(slot => slot.spotsOpen > 0),
  bookingEventId: state.manageCalendar.bookingEventId,
  isFetchBookingSlots: state.manageCalendar.isFetchBookingSlots,
  calendarData: state.manageCalendar.calendarData,
});

const mapDispatchToProps = {
  createNewEvent,
  fetchGeoLocationOptions,
  fetchServiceOptionsByBusinessAdminId,
  fetchTimezoneOptions,
  fetchProvidersByBusinessId,
  fetchEventsByProviderId,
  fetchProvidersByBusinessIdSuccess,
  fetchSurveyOptionsByAssessorId,
  setBookingSlots,
  rescheduleBookingEvent,
  cancelBookingEvent,
  getSlotsByTmpServiceId,
  deleteEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCalendar);
