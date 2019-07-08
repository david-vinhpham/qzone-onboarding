import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import moment from 'moment-timezone';

import { fetchEventsByBusinessId, createNewEvent } from 'actions/calendar';
import {
  EVENT_LEVEL,
  EVENT_TYPE,
  EVENT_REPEAT_TYPE
} from 'constants/Calendar.constants';
import { providerType, optionType } from 'types/global';
import Calendar from './CalendarV2';
import AddEventDialog from './AddEventDialog';
import CalendarLoading from './CalendarLoading';
import { createNewEventHelper } from './helpers';

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
    this.state = { ...this.initialState };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userSub');
    if (userId) {
      this.props.fetchEventsByBusinessId(userId);
    }
  }

  closeAddDialog = () => this.setState(this.initialState);

  onClickNewEvent = (providerDetail, startTime, endTime) => {
    this.setState(() => {
      const defaultProvider = this.props.providers[0];
      const chosenProvider = providerDetail === 'none' ? defaultProvider : providerDetail;
      const addEventData = {
        eventType: Object.values(EVENT_TYPE)[0],
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
    const { providers, tzOptions, serviceOptions, isLoading } = this.props;
    const { isOpenAddDialog, eventLevel, addEventData } = this.state;

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
            createNewEvent={this.onCreateNewEvent}
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
  tzOptions: state.timezoneOptions.tzOptions,
  serviceOptions: state.serviceOptions.serviceOptions
});

const mapDispatchToProps = dispatch => ({
  fetchEventsByBusinessId: businessId => dispatch(fetchEventsByBusinessId(businessId)),
  createNewEvent: newEvent => dispatch(createNewEvent(newEvent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCalendar);
