import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, func } from 'prop-types';
import moment from 'moment';

import { fetchNormalEventByBusinessId, createNewEvent } from 'actions/calendar';
import { EVENT_LEVEL, EVENT_TYPE } from 'constants/Calendar.constants';
import { providerType } from 'types/global';
import Calendar from './CalendarV2';
import AddEventDialog from './AddEventDialog';

class ManageCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.initialState = {
      isOpenAddDialog: false,
      addEventData: { eventType: '' },
      eventLevel: EVENT_LEVEL.ORGANIZATION
    };
    this.state = { ...this.initialState };
  }

  componentDidMount() {
    const userId = localStorage.getItem('userSub');
    if (userId) {
      this.props.fetchNormalEventByBusinessId(userId);
    }
  }

  closeAddDialog = () => this.setState(this.initialState);

  onClickNewEvent = (schedulerData, providerId, providerName, startTime, endTime) => {
    this.setState(() => {
      const addEventData =
        providerId === undefined
          ? {
              startTime: moment(),
              endTime: moment().add(1, 'hour'),
              eventType: Object.values(EVENT_TYPE)[0],
              description: ''
            }
          : {
              providerId,
              providerName,
              startTime: moment(startTime),
              endTime: moment(endTime),
              eventType: Object.values(EVENT_TYPE)[0],
              description: ''
            };

      return {
        eventLevel: providerId ? EVENT_LEVEL.PROVIDER : EVENT_LEVEL.ORGANIZATION,
        isOpenAddDialog: true,
        addEventData
      };
    });
  };

  createNewEvent = addEventData => {
    if (this.state.eventLevel === EVENT_LEVEL.ORGANIZATION) {
      this.createOrgNewEvent(addEventData);
      return;
    }

    const { providerId, startTime, endTime, eventType, description } = addEventData;

    const payload = {
      description,
      isAllowRepeat: false,
      providerId,
      slot: { startTime: moment(startTime).unix(), endTime: moment(endTime).unix() },
      type: eventType
    };

    this.props.createNewEvent(payload).then(this.closeAddDialog);
  };

  createOrgNewEvent = addEventData => {
    const { startTime, endTime, eventType, description } = addEventData;

    const fetchMap = this.props.providers.map(provider => {
      const payload = {
        description,
        isAllowRepeat: false,
        providerId: provider.id,
        slot: { startTime: moment(startTime).unix(), endTime: moment(endTime).unix() },
        type: eventType
      };

      return this.props.createNewEvent(payload);
    });

    Promise.all(fetchMap).then(this.closeAddDialog);
  };

  render() {
    const { providers } = this.props;
    const { isOpenAddDialog, eventLevel, addEventData } = this.state;

    return (
      <>
        <Calendar providers={providers} onClickNewEvent={this.onClickNewEvent} />
        <AddEventDialog
          eventLevel={eventLevel}
          providers={providers}
          isOpenAddDialog={isOpenAddDialog}
          closeAddDialog={this.closeAddDialog}
          addEventData={addEventData}
          createNewEvent={this.createNewEvent}
        />
      </>
    );
  }
}

ManageCalendar.propTypes = {
  providers: arrayOf(providerType).isRequired,
  fetchNormalEventByBusinessId: func.isRequired,
  createNewEvent: func.isRequired
};

const mapStateToProps = state => ({
  providers: state.calendarManage.providers,
  isLoading: state.calendarManage.isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchNormalEventByBusinessId: businessId => dispatch(fetchNormalEventByBusinessId(businessId)),
  createNewEvent: newEvent => dispatch(createNewEvent(newEvent))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCalendar);
