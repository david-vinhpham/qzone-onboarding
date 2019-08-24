import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, any, func } from 'prop-types';
import {
  Button,
  Select, MenuItem,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import Calendar from 'components/Calendar';
import { providerType, userDetailType } from 'types/global';
import styles from './CalendarV2.module.scss';
import { fetchEventsByProviderId } from 'actions/calendar';
import { eUserType } from 'constants.js';

class CalendarV2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedProvider: props.userDetail.userType === eUserType.provider
        ? {
          id: props.userDetail.id,
          name: `${props.userDetail.familyName || ''} ${props.userDetail.givenName}`,
          timezone: props.userDetail.providerInformation.timeZoneId
        }
        : 'none'
    };
  }

  onSelectProvider = ({ target: { value } }) => {
    this.setState({ selectedProvider: value });
    if (value !== 'none') { this.props.fetchEventsByProviderId(value.id); }
  }

  rightCustomHeader = () => {
    const { userDetail } = this.props;

    return (
      <div className={styles.calendarRightCustomHeader}>
        {userDetail.userType !== eUserType.provider &&
          <Select
            value={this.state.selectedProvider}
            onChange={this.onSelectProvider}
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
      this.state.selectedProvider,
      start ? start.toDate() : (new Date()).setHours(8, 0, 0),
      end ? end.toDate() : (new Date()).setHours(18, 0, 0)
    );
  }

  render() {
    const { calendarData } = this.props;
    const { selectedProvider } = this.state;

    return (
      <Calendar
        events={selectedProvider === 'none' ? [] : calendarData}
        onClickNewEvent={this.onClickNewEvent}
        rightCustomHeader={this.rightCustomHeader}
      />
    );
  }
}

CalendarV2.propTypes = {
  providers: arrayOf(providerType).isRequired,
  calendarData: arrayOf(any).isRequired,
  onClickNewEvent: func.isRequired,
  fetchEventsByProviderId: func.isRequired,
  userDetail: userDetailType.isRequired
};

const mapStateToProps = state => ({
  calendarData: state.calendarManage.calendarData,
  userDetail: state.user.userDetail,
});

export default connect(mapStateToProps, { fetchEventsByProviderId })(CalendarV2);
