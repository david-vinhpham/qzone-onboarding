import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, any, func } from 'prop-types';
import {
  Typography, Grid, IconButton, Button,
  Select, MenuItem,
} from '@material-ui/core';
import { Schedule, Edit, Delete, Add } from '@material-ui/icons';

import Calendar from 'components/Calendar';
import { EVENT_BG_COLOR } from 'constants/Calendar.constants';
import { providerType } from 'types/global';
import styles from './CalendarV2.module.scss';

class ManageCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedProvider: 'all'
    };
  }

  getEventStyle = (eventType, mustBeHeight) => {
    return {
      backgroundColor: EVENT_BG_COLOR[eventType].backgroundColor,
      color: EVENT_BG_COLOR[eventType].color,
      height: mustBeHeight,
      paddingLeft: '8px',
      borderRadius: '10px'
    };
  };

  getStickerTemplate = (
    schedulerData,
    event,
    bgColor,
    isStart,
    isEnd,
    mustAddCssClass,
    mustBeHeight,
    agendaMaxEventWidth
  ) => {
    const titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, event);
    let divStyle = this.getEventStyle(event.type, mustBeHeight);
    if (agendaMaxEventWidth) divStyle = { ...divStyle, maxWidth: agendaMaxEventWidth };
    const titleStyle = { color: EVENT_BG_COLOR[event.type].color };

    return (
      <div key={event.id} className={mustAddCssClass} style={divStyle}>
        <Typography variant="body2" style={titleStyle}>
          {titleText}
        </Typography>
      </div>
    );
  };

  getPopoverTemplate = (schedulerData, event, title, start, end) => {
    return (
      <Grid container spacing={16}>
        <Grid item md={12} className={styles.eventActions}>
          <div className={styles.eventTitle}>
            <div className={styles.eventMarkerWrapper}>
              <div
                className={styles.eventMarker}
                style={{ backgroundColor: EVENT_BG_COLOR[event.type].backgroundColor }}
              />
            </div>
            <div>
              <Typography variant="subtitle2">{title}</Typography>
            </div>
          </div>
          <div>
            <IconButton size="small" onClick={this.toggleDetailDialog}>
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={this.toggleDetailDialog}>
              <Delete fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item md={12} className={styles.eventPopoverContent}>
          <p>{event.description}</p>
          <div className={styles.eventPopoverTime}>
            <Schedule fontSize="small" />
            <div>
              <Typography variant="caption">{start.format('l')}</Typography>
              <Typography variant="caption">
                {`From ${start.format('LT')} to ${end.format('LT')}`}
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };

  onSelectProvider = ({ target: { value } }) => {
    this.setState({ selectedProvider: value });
  }

  rightCustomHeader = () => (
    <div>
      <Select
        value={this.state.selectedProvider}
        onChange={this.onSelectProvider}
        className={styles.selectProvider}
      >
        <MenuItem value="all">
          All providers
        </MenuItem>
        {this.props.providers.map(prov => (
          <MenuItem value={prov.id} key={prov.id}>
            {prov.name}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        style={{ color: 'white' }}
        onClick={this.props.onClickNewEvent}
      >
        <Add fontSize="small" />
        &nbsp;New event
      </Button>
    </div>
  );

  render() {
    const { providers, calendarData, onClickNewEvent } = this.props;
    const { selectedProvider } = this.state;
    const resources = selectedProvider === 'all'
      ? providers
      : providers.filter(prov => prov.id === selectedProvider);

    return (
      <Calendar
        resources={resources}
        events={calendarData}
        stickerTemplate={this.getStickerTemplate}
        popoverTemplate={this.getPopoverTemplate}
        onClickNewEvent={onClickNewEvent}
        rightCustomHeader={this.rightCustomHeader()}
      />
    );
  }
}

ManageCalendar.propTypes = {
  providers: arrayOf(providerType).isRequired,
  calendarData: arrayOf(any).isRequired,
  onClickNewEvent: func.isRequired
};

const mapStateToProps = state => ({
  calendarData: state.calendarManage.calendarData
});

export default connect(mapStateToProps)(ManageCalendar);
