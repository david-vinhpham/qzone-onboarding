import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogActions, DialogTitle,
  Typography, LinearProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Button from 'components/CustomButtons/Button';
import { CSVLink } from 'react-csv';

const useStyles = makeStyles((theme) => ({
  reportLinkWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  reportLink: {
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
}));

let timer = null;

const ScheduleReportDialog = ({ onDialogClose, reportData, isReportLoading }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    if (isReportLoading && !timer) {
      timer = setInterval(progress, 300);
    }

    if (!isReportLoading && timer) {
      setCompleted(0);
      clearInterval(timer);
      timer = null;
    }

    return () => {
      clearInterval(timer);
      timer = null;
    };
  }, [isReportLoading]);

  let dialogContent = (<>
    <Typography>Please click the link below for downloading the report!</Typography>
    <div className={classes.reportLinkWrapper}>
      <CSVLink className={classes.reportLink} {...reportData}>{reportData.filename}</CSVLink>
    </div>
  </>);

  if (isReportLoading) {
    dialogContent = (<>
      <Typography>Please wait while your report is generating!</Typography>
      <LinearProgress variant="determinate" value={completed} />
    </>);
  } else if (reportData.data.length === 0) {
    dialogContent = (<Typography>Your report cannot be generated!</Typography>)
  }

  return (
    <Dialog
      disableBackdropClick
      open
      aria-labelledby="schedule-report-dialog"
      onClose={onDialogClose}
    >
      <DialogTitle>
        Schedule report
      </DialogTitle>
      <DialogContent>
        {dialogContent}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
};

ScheduleReportDialog.propTypes = {
  onDialogClose: PropTypes.func.isRequired,
  reportData: PropTypes.shape({
    filename: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      providerName: PropTypes.string,
      dateEvent: PropTypes.string,
      customerName: PropTypes.string,
      customerEmail: PropTypes.string,
      customerPhone: PropTypes.string,
      startTime: PropTypes.string,
      toTime: PropTypes.string,
      status: PropTypes.string,
    })),
  }),
  isReportLoading: PropTypes.bool.isRequired,
}

export default ScheduleReportDialog;
