import React, { useState } from 'react';
import { arrayOf, any, func } from 'prop-types';
import TUICalendar from '@toast-ui/react-calendar';
import { Button, Paper, Typography } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment-timezone';
import ReactResizeDetector from 'react-resize-detector';

import 'tui-calendar/dist/tui-calendar.css';
import { EVENT_TYPE, EVENT_TYPE_TITLE, EVENT_BG_COLOR } from 'constants/Calendar.constants';
import styles from './index.module.scss';

const localTimezone = moment.tz.guess();

const onClickToday = (setViewDate, ref) => () => {
  ref.current.getInstance().today();
  setViewDate(moment().toDate());
}

const onClickNext = (setViewDate, ref) => () => {
  ref.current.getInstance().next();
  setViewDate(oldViewDate => moment(oldViewDate).add(7, 'day').toDate());
}

const onClickPrev = (setViewDate, ref) => () => {
  ref.current.getInstance().prev();
  setViewDate(oldViewDate => moment(oldViewDate).subtract(7, 'day').toDate());
}

const onChangeViewDate = (setViewDate, ref) => (value) => {
  const formattedDate = value.toDate();
  setViewDate(formattedDate);
  ref.current.getInstance().setDate(formattedDate);
}

const onResize = (ref) => () => {
  ref.current.getInstance().render(true);
}

const Calendar = ({ onClickNewEvent, events, rightCustomHeader }) => {
  const calendarRef = React.createRef();
  const [viewDate, setViewDate] = useState(new Date());

  return (
    <ReactResizeDetector handleWidth handleHeight onResize={onResize(calendarRef)}>
      <Paper classes={{ root: styles.calendarWrapper }}>
        <div className={styles.calendarHeader}>
          <div className={styles.calendarHeaderLeftItem}>
            <Typography display="inline" classes={{ root: styles.calendarTimezone }}>
              Time zone: {localTimezone}
            </Typography>
            <DatePicker
              value={viewDate}
              onChange={onChangeViewDate(setViewDate, calendarRef)}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickToday(setViewDate, calendarRef)}
            >
              Today
          </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickPrev(setViewDate, calendarRef)}
            >
              &lt;
          </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClickNext(setViewDate, calendarRef)}
            >
              &gt;
          </Button>
          </div>
          {rightCustomHeader && rightCustomHeader()}
        </div>
        <TUICalendar
          ref={calendarRef}
          onBeforeCreateSchedule={onClickNewEvent}
          usageStatistics={false}
          taskView={false}
          scheduleView={['time']}
          disableDblClick
          useDetailPopup
          height={'calc(100vh - 214px)'}
          template={{
            time(schedule) {
              return `${schedule.title}<br/>${schedule.raw}<br/>${moment(schedule.start.getTime()).format('HH:mm')} - ${moment(schedule.end.getTime()).format('HH:mm a')}`;
            }
          }}
          theme={{
            'week.timegridHalfHour.height': '70px',
            'week.timegridOneHour.height': '140px'
          }}
          calendars={Object.keys(EVENT_TYPE).map(eventType => ({
            id: eventType,
            name: EVENT_TYPE_TITLE[eventType],
            bgColor: EVENT_BG_COLOR[eventType].backgroundColor,
            borderColor: EVENT_BG_COLOR[eventType].backgroundColor,
            color: EVENT_BG_COLOR[eventType].color
          }))}
          schedules={events}
        />
      </Paper>
    </ReactResizeDetector>
  );
}

Calendar.propTypes = {
  events: arrayOf(any).isRequired,
  onClickNewEvent: func.isRequired,
  rightCustomHeader: func,
};

Calendar.defaultProps = {
  rightCustomHeader: undefined
}

export default Calendar;
