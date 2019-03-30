import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, any, func } from 'prop-types';
import { Typography, Grid, IconButton } from '@material-ui/core';
import { Schedule, Edit, Delete } from '@material-ui/icons';

import Calendar from 'components/Calendar';
import { EVENT_BG_COLOR } from 'constants/Calendar.constants';
import { providerType } from 'types/global';
import styles from './CalendarV2.module.scss';

class ManageCalendar extends React.PureComponent {
  getEventStyle = eventType => {
    return {
      borderLeft: `4px solid ${EVENT_BG_COLOR[eventType].marker}`,
      backgroundColor: EVENT_BG_COLOR[eventType].backgroundColor,
      color: EVENT_BG_COLOR[eventType].color,
      height: '100%'
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
    let divStyle = this.getEventStyle(event.type);
    if (agendaMaxEventWidth) divStyle = { ...divStyle, maxWidth: agendaMaxEventWidth };
    const titleStyle = { color: EVENT_BG_COLOR[event.type].color, marginLeft: '4px' };

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
              <Typography variant="h7">{title}</Typography>
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

  render() {
    const { providers, calendarData, onClickNewEvent } = this.props;
    return (
      <Calendar
        resources={providers}
        events={calendarData}
        stickerTemplate={this.getStickerTemplate}
        popoverTemplate={this.getPopoverTemplate}
        onClickNewEvent={onClickNewEvent}
        onClickNewEventButton={onClickNewEvent}
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
