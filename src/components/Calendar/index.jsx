import React, { useState } from 'react';
import classnames from 'classnames';
import { arrayOf, any, func } from 'prop-types';
import TUICalendar from '@toast-ui/react-calendar';
import { Button, Paper, Typography, Select, MenuItem, ButtonGroup  } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment-timezone';
import ReactResizeDetector from 'react-resize-detector';

import 'tui-calendar/dist/tui-calendar.css';
import { EVENT_TYPE, EVENT_TYPE_TITLE, EVENT_BG_COLOR } from 'constants/Calendar.constants';
import styles from './index.module.scss';
import truncateText from 'utils/truncateText';
import { timeSlotFormat } from 'constants.js';

const calendarViewToMomentUnitMapping = {
  week: 'w',
  day: 'd',
  month: 'M'
};

const localTimezone = moment.tz.guess();

const onClickToday = (setViewDate, ref) => () => {
  ref.current.getInstance().today();
  setViewDate(moment().toDate());
}

const onClickNext = (viewDate, setViewDate, ref) => () => {
  const calendarInstance = ref.current.getInstance();
  calendarInstance.next();
  setViewDate(moment(viewDate).add(
    1,
    calendarViewToMomentUnitMapping[calendarInstance.getViewName()]
  ));
}

const onClickPrev = (viewDate, setViewDate, ref) => () => {
  const calendarInstance = ref.current.getInstance();
  calendarInstance.prev();
  setViewDate(moment(viewDate).subtract(
    1,
    calendarViewToMomentUnitMapping[calendarInstance.getViewName()]
  ));
}

const onChangeViewDate = (setViewDate, ref) => (value) => {
  const formattedDate = value.toDate();
  setViewDate(formattedDate);
  ref.current.getInstance().setDate(formattedDate);
}

const onResize = (ref) => () => {
  ref.current.getInstance().render(true);
}

const getTimeTemplate = (calendarView) => (schedule) => {
  return calendarView === 'month' ? truncateText(schedule.title) :
    `${
    truncateText(schedule.title)
    }<br/>${
    schedule.raw.resourceId
    }<br/>${
    schedule.raw.phone
    }<br/>${
    moment(schedule.start.getTime()).format(timeSlotFormat)
    } - ${
    moment(schedule.end.getTime()).format(timeSlotFormat)
    }`;
};

const onSelectCalendarView = (setCalendarView) => ({ target: { value } }) => {
  setCalendarView(value);
}

const Calendar = ({ onClickNewEvent, events, rightCustomHeader, onClickUpdateEvent, onClickDeleteEvent }) => {
  const calendarRef = React.createRef();
  const [viewDate, setViewDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('week');

  return (
    <ReactResizeDetector handleWidth handleHeight onResize={onResize(calendarRef)}>
      <Paper classes={{
        root: classnames(
          styles.calendarWrapper,
          { [styles.isDayCalendar]: calendarView === 'day' }
        )
      }}>
        <div className={styles.calendarHeader}>
          <div className={styles.calendarHeaderLeftItem}>
            <Typography display="inline" classes={{ root: styles.calendarTimezone }}>
              Time zone: {localTimezone}
            </Typography>
            <Select
              value={calendarView}
              onChange={onSelectCalendarView(setCalendarView)}
            >
              <MenuItem value="week">
                Week
              </MenuItem>
              <MenuItem value="day">
                Day
              </MenuItem>
              <MenuItem value="month">
                Month
              </MenuItem>
            </Select>
            <DatePicker
              value={viewDate}
              onChange={onChangeViewDate(setViewDate, calendarRef)}
            />
            <ButtonGroup color="primary" className={styles.calendarNavigation}>
              <Button
                onClick={onClickToday(setViewDate, calendarRef)}
              >
                Today
              </Button>
              <Button
                onClick={onClickPrev(viewDate, setViewDate, calendarRef)}
              >
                &lt;
              </Button>
              <Button
                onClick={onClickNext(viewDate, setViewDate, calendarRef)}
              >
                &gt;
              </Button>
            </ButtonGroup>
          </div>
          {rightCustomHeader && rightCustomHeader()}
        </div>
        <TUICalendar
          view={calendarView}
          ref={calendarRef}
          onBeforeCreateSchedule={onClickNewEvent}
          onBeforeUpdateSchedule={onClickUpdateEvent}
          onBeforeDeleteSchedule={onClickDeleteEvent}
          usageStatistics={false}
          taskView={false}
          scheduleView={['time']}
          useDetailPopup
          /*disableClick
          disableDblClick*/
          height="calc(100vh - 116px)"
          template={{
            time: getTimeTemplate(calendarView),
            popupEdit() {
              return 'Reschedule';
            },
            popupDelete() {
              return 'Cancel';
            }
          }}
          theme={{
            'week.timegridHalfHour.height': '70px',
            'week.timegridOneHour.height': '140px',
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
  onClickUpdateEvent: func.isRequired,
  onClickDeleteEvent: func.isRequired
};

Calendar.defaultProps = {
  rightCustomHeader: undefined
}

export default Calendar;
