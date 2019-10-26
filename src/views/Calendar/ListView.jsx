import React, { memo, useState } from 'react';
import { Paper, Typography, Grid, Button, ButtonGroup, IconButton } from '@material-ui/core';
import moment from 'moment-timezone';
import styles from './ListView.module.scss';
import truncateText from 'utils/truncateText';
import { selectDateFormat, timeSlotFormat, shortDateFormat } from 'constants.js';
import { EVENT_BG_COLOR, EVENT_TYPE } from 'constants/Calendar.constants';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

const onRescheduleBookingEvent = (event, onClickUpdateEvent) => () => {
  onClickUpdateEvent(event.raw.tempServiceId, event.id);
};

const onDeleteBookingEvent = (event, onCancelBookingEvent) => () => {
  onCancelBookingEvent(event.id);
};

const onSetListViewOpen = (setListViewOpen) => () => {
  setListViewOpen(oldListViewOpen => !oldListViewOpen);
}

const onDeleteOtherEvents = (event, onDeleteEvent) => () => {
  onDeleteEvent({ id: event.id, type: event.calendarId });
}

const ListView = ({ calendarData, onClickUpdateEvent, onCancelBookingEvent, onDeleteEvent }) => {
  const [listViewOpen, setListViewOpen] = useState(false);
  const today = moment();
  const events = calendarData.filter((data) => {
    return moment(data.start).isSameOrAfter(today);
  });

  if (events.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <IconButton color="primary" onClick={onSetListViewOpen(setListViewOpen)}>
        {listViewOpen ? (<ArrowForwardIosOutlinedIcon />) : (<ArrowBackIosOutlinedIcon />)}
      </IconButton>
      <div className={styles.listView}>
        {events.map((data) => (
          <Grid container className={styles.row} key={data.id}>
            {listViewOpen && (
              <Grid item>
                <Typography variant="h6">{moment(data.start).format(selectDateFormat)}</Typography>
              </Grid>
            )}
            <Grid item xs={listViewOpen ? 12 : undefined}>
              <Paper
                className={styles.eventContent}
                style={{ borderLeft: `6px solid ${EVENT_BG_COLOR[data.calendarId].backgroundColor}` }}
              >
                {listViewOpen ? (
                  <>
                    <div>
                      <Typography gutterBottom variant="subtitle1">{truncateText(data.title)}</Typography>
                      <Typography gutterBottom variant="subtitle2">{data.raw.resourceId} {data.raw.phone}</Typography>
                      <Typography variant="caption">{moment(data.start).format(timeSlotFormat)} - {moment(data.end).format(timeSlotFormat)}</Typography>
                    </div>
                    <ButtonGroup color="primary" size="small" className={styles.eventActions}>
                      {data.calendarId === EVENT_TYPE.APPOINTMENT && <Button onClick={onRescheduleBookingEvent(data, onClickUpdateEvent)}>Reschedule</Button>}
                      <Button
                        onClick={
                          data.calendarId === EVENT_TYPE.APPOINTMENT
                            ? onDeleteBookingEvent(data, onCancelBookingEvent)
                            : onDeleteOtherEvents(data, onDeleteEvent)
                        }>
                        Cancel
                      </Button>
                    </ButtonGroup>
                  </>
                ) : (
                    <>
                      <Typography>{moment(data.start).format(shortDateFormat)}</Typography>
                      <Typography variant="caption">{moment(data.start).format(timeSlotFormat)} - {moment(data.end).format(timeSlotFormat)}</Typography>
                    </>
                  )}
              </Paper>
            </Grid>
          </Grid>
        ))}
      </div>
    </div >
  )
}

export default memo(ListView);
