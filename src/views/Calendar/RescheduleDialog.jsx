import React, { useState } from 'react';
import {
  Dialog, DialogTitle, Typography, IconButton, DialogContent,
  Button, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions
} from '@material-ui/core';
import { ChevronRight, ChevronLeft, ExpandMore, Close } from '@material-ui/icons';
import moment from 'moment-timezone';
import chunk from 'lodash/chunk';
import styles from './RescheduleDialog.module.scss';
import CustomModal from 'components/CustomModal/CustomModal';

const NO_SLOTS_PER_ROW = 3;
const NO_ROWS_PER_DATE = 3;
const selectDateFormat = 'dddd, DD MMMM YYYY';
const timeSlotFormat = 'hh:mm a';

const handleChunkIndexLess = (date, setChunkIndex) => () => {
  setChunkIndex(oldState => {
    const oldIndex = oldState.chunkIndex[`${date}-index`] || 0;
    return {
      ...oldState.chunkIndex,
      [`${date}-index`]: oldIndex > 0 ? oldIndex - 1 : 0,
    };
  });
};

const handleChunkIndexMore = (date, max, setChunkIndex) => () => {
  setChunkIndex(oldState => {
    const oldIndex = oldState.chunkIndex[`${date}-index`] || 0;
    return {
      ...oldState.chunkIndex,
      [`${date}-index`]: oldIndex < max ? oldIndex + 1 : max,
    };
  });
};

const onSelectSlot = (slot, setSelectedSlot) => () => {
  setSelectedSlot(slot);
}

const onCloseConfirmModal = (setSelectedSlot) => () => {
  setSelectedSlot(null);
}

const RescheduleDialog = ({ bookingSlots, onClose, onReschedule }) => {
  const [chunkIndex, setChunkIndex] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slotsByDate = bookingSlots.reduce((acc, slot) => {
    const date = moment(slot.startSec * 1000).format(selectDateFormat);
    return {
      ...acc,
      [date]: (acc[date] || []).concat([slot]),
    }
  }, {});

  const transformedSlot = Object.keys(slotsByDate).reduce((acc, date) => {
    const chunkSlots = chunk(slotsByDate[date], NO_SLOTS_PER_ROW);
    const slot = chunk(chunkSlots, NO_ROWS_PER_DATE);
    return {
      ...acc,
      [date]: slot,
      [`${date}-max`]: slot.length - 1
    };
  }, {});

  const isDefaultExpand = Object.keys(slotsByDate).length === 1;
  const rescheduledTime = selectedSlot ? selectedSlot.startSec * 1000 : undefined;

  return (
    <>
      <CustomModal
        openModal={!!selectedSlot}
        onClose={onCloseConfirmModal(setSelectedSlot)}
        onConfirm={onReschedule(selectedSlot)}
        title="Reschedule confirmation"
        message={
          `Are you sure to reschedule this event to other slot at '${moment(rescheduledTime).format(timeSlotFormat)}'`
        }
        closeButtonLabel="Cancel"
        confirmButtonLabel="OK"
      />
      <Dialog
        disableBackdropClick
        open
        aria-labelledby="reschedule-dialog"
        onClose={onClose}
        maxWidth="xs"
      >
        <DialogTitle disableTypography id="reschedule-dialog" className={styles.header}>
          <Typography className={styles.title} variant="subtitle1">Rescheduled slots</Typography>
          <IconButton aria-label="close" onClick={onClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles.content}>
          {Object.keys(transformedSlot).map(date => moment(date).isValid() && (
            <ExpansionPanel key={date} defaultExpanded={isDefaultExpand}>
              <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                {date}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={styles.slotGrid}>
                <Grid container spacing={2}>
                  {transformedSlot[date][chunkIndex[`${date}-index`] || 0] &&
                    transformedSlot[date][chunkIndex[`${date}-index`] || 0].map(chunkRow => {
                      return (
                        <Grid item xs={12 / NO_SLOTS_PER_ROW} key={chunkRow[0].id}>
                          {chunkRow.map(slot => (
                            <Button
                              fullWidth
                              variant="outlined"
                              className={styles.slot}
                              key={slot.id}
                              onClick={onSelectSlot(slot, setSelectedSlot)}
                            >
                              {moment(slot.startSec * 1000).format(timeSlotFormat)}
                            </Button>
                          ))}
                        </Grid>
                      )
                    })
                  }
                </Grid>
                <ExpansionPanelActions>
                  <Grid container className={styles.navigationButtons}>
                    <Grid item className={styles.prevButton}>
                      <Button
                        disabled={!chunkIndex[`${date}-index`] || chunkIndex[`${date}-index`] === 0}
                        onClick={handleChunkIndexLess(date, setChunkIndex)}
                        startIcon={<ChevronLeft />}
                      >
                        prev
                  </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={handleChunkIndexMore(date, transformedSlot[`${date}-max`], setChunkIndex)}
                        disabled={chunkIndex[`${date}-index`] === transformedSlot[`${date}-max`] || transformedSlot[`${date}-max`] === 0}
                        endIcon={<ChevronRight />}
                      >
                        next
                  </Button>
                    </Grid>
                  </Grid>
                </ExpansionPanelActions>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </DialogContent>
      </Dialog>
    </>
  )
};

export default RescheduleDialog;
