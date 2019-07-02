import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, any, func } from 'prop-types';
import {
  Button,
  Select, MenuItem,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import Calendar from 'components/Calendar';
import { providerType } from 'types/global';
import styles from './CalendarV2.module.scss';

class ManageCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { selectedProvider: 'none' };
  }

  onSelectProvider = ({ target: { value } }) => {
    this.setState({ selectedProvider: value });
  }

  rightCustomHeader = () => (
    <div className={styles.calendarRightCustomHeader}>
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
      </Select>
      <Button
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

  onClickNewEvent = ({ start, end }) => {
    this.props.onClickNewEvent(this.state.selectedProvider, start ? start.toDate() : undefined, end ? end.toDate() : undefined);
  }

  render() {
    const { calendarData } = this.props;
    const { selectedProvider } = this.state;
    const events = calendarData.filter(e => e.providerId === selectedProvider.id);

    return (
      <Calendar
        events={events}
        onClickNewEvent={this.onClickNewEvent}
        rightCustomHeader={this.rightCustomHeader}
      />
    );
  }
}

ManageCalendar.propTypes = {
  providers: arrayOf(providerType).isRequired,
  calendarData: arrayOf(any).isRequired,
  onClickNewEvent: func.isRequired,
};

const mapStateToProps = state => ({
  calendarData: state.calendarManage.calendarData
});

export default connect(mapStateToProps)(ManageCalendar);
