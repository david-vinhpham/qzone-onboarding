import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, any, func, shape, string } from 'prop-types';
import {
  Button,
  Select, MenuItem,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { debounce } from 'lodash';

import Calendar from 'components/Calendar';
import { providerType, userDetailType } from 'types/global';
import styles from './CalendarV2.module.scss';
import { getSlotsByTmpServiceId } from 'actions/calendar';
import { eUserType } from 'constants.js';

class CalendarV2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.debouncedOnClickUpdateEvent = debounce(this.onClickUpdateEvent, 50);
    this.debouncedOnCancelBookingEvent = debounce(this.props.onCancelBookingEvent, 50);
  }

  rightCustomHeader = () => {
    const { userDetail } = this.props;

    return (
      <div className={styles.calendarRightCustomHeader}>
        {userDetail.userType !== eUserType.provider &&
          <Select
            value={this.props.selectedProvider}
            onChange={this.props.onSelectProvider}
            className={styles.selectProvider}
          >
            <MenuItem value="none">
              Select provider
            </MenuItem>
            {this.props.providers.map(prov => (
              <MenuItem value={prov} key={prov.id}>
                {prov.name}
              </MenuItem>
            ))}
          </Select>}
        <Button
          data-test-id="newCalendarEventBtn"
          variant="contained"
          color="primary"
          style={{ color: 'white' }}
          onClick={this.onClickNewEvent}
        >
          <Add fontSize="small" />
          &nbsp;New event
        </Button>
      </div>
    );
  }

  onClickNewEvent = ({ start, end }) => {
    this.props.onClickNewEvent(
      this.props.selectedProvider,
      start ? start.toDate() : (new Date()).setHours(8, 0, 0),
      end ? end.toDate() : (new Date()).setHours(18, 0, 0)
    );
  }

  onClickUpdateEvent = ({ schedule, triggerEventName }) => {
    if (triggerEventName === 'click') {
      this.props.getSlotsByTmpServiceId(schedule.raw.tempServiceId, schedule.id);
    }
  }

  onClickDeleteEvent = ({ schedule }) => {
    this.debouncedOnCancelBookingEvent(schedule.id);
  }

  render() {
    const { calendarData, selectedProvider } = this.props;

    return (
      <Calendar
        events={selectedProvider === 'none' ? [] : calendarData}
        onClickNewEvent={this.onClickNewEvent}
        rightCustomHeader={this.rightCustomHeader}
        onClickUpdateEvent={this.debouncedOnClickUpdateEvent}
        onClickDeleteEvent={this.onClickDeleteEvent}
      />
    );
  }
}

CalendarV2.propTypes = {
  providers: arrayOf(providerType).isRequired,
  calendarData: arrayOf(any).isRequired,
  onClickNewEvent: func.isRequired,
  userDetail: userDetailType.isRequired,
  getSlotsByTmpServiceId: func.isRequired,
  selectedProvider: shape({
    id: string,
    name: string,
    timezone: string,
    workingHours: arrayOf(any)
  }),
  onCancelBookingEvent: func.isRequired
};

const mapStateToProps = state => ({
  calendarData: state.manageCalendar.calendarData,
});

export default connect(mapStateToProps, { getSlotsByTmpServiceId })(CalendarV2);
