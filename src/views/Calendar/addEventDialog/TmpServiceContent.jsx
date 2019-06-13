import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid,
  Select, MenuItem,
  TextField, Tooltip
} from '@material-ui/core';
import moment from 'moment-timezone';
import { LiveHelp } from '@material-ui/icons';
import { TimeFormatInput } from 'material-ui-next-pickers';
import addEventDialogStyles from '../AddEventDialog.module.scss';
import styles from './TmpServiceContent.module.scss';
import { optionType } from 'types/global';

export default function TmpServiceContent({
  geoOptions,
  serviceOptions,
  addEventData: { tmpService, startTime, endTime, timezoneId },
  handleChange,
  onBlurServiceTime,
  onChangeTmpServiceDateTime,
  onBlurParallelCustomer,
}) {
  const breakStartTime = moment.tz(tmpService.breakTimeStart, timezoneId).toDate();
  const breakEndTime = moment.tz(tmpService.breakTimeEnd, timezoneId).toDate();

  return (
    <Grid container spacing={1} className={addEventDialogStyles.calendarDatetimePicker}>
      <Grid item md={12}>
        <Grid container spacing={1}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Service:
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Select
              name="addEventData.tmpService.serviceId"
              value={tmpService.serviceId}
              onChange={handleChange}
              className={addEventDialogStyles.eventTypeSelect}
            >
              {serviceOptions.map(svc => (
                <MenuItem value={svc.value} key={svc.value}>
                  {svc.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1} className={styles.averageBox}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Average Service Time:
              </Typography>
          </Grid>
          <Grid item md={2}>
            <TextField
              type="number"
              name="addEventData.tmpService.avgServiceTime"
              value={tmpService.avgServiceTime}
              onChange={handleChange}
              onBlur={onBlurServiceTime}
            />
          </Grid>
          <Grid item md={3}>
            <Typography variant="body2" display="inline" noWrap>
              minutes
              </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} className={styles.breakTimeWrapper}>
        <Grid container spacing={1}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2">
              Break time:
              </Typography>
            <Tooltip
              title={`Must be between ${
                moment.tz(startTime, timezoneId).format('LT')
                } and ${
                moment.tz(endTime, timezoneId).format('LT')
                }`
              }
            >
              <LiveHelp fontSize="small" className={styles.breakTimeIcon} />
            </Tooltip>
          </Grid>
          <Grid item md={10}>
            <Grid container>
              <Grid item md={5}>
                <TimeFormatInput
                  name="addEventData.tmpService.breakTimeStart"
                  value={breakStartTime}
                  onChange={onChangeTmpServiceDateTime('fromTime')}
                />
              </Grid>
              <Grid item md={2} className={addEventDialogStyles.label}>
                <Typography variant="body2">
                  to
                </Typography>
              </Grid>
              <Grid item md={5}>
                <TimeFormatInput
                  name="addEventData.tmpService.breakTimeEnd"
                  value={breakEndTime}
                  onChange={onChangeTmpServiceDateTime('toTime')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Location:
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Select
              name="addEventData.tmpService.geoLocationId"
              value={tmpService.geoLocationId}
              onChange={handleChange}
              className={addEventDialogStyles.eventTypeSelect}
            >
              {geoOptions.map(geoOption => (
                <MenuItem value={geoOption.value} key={geoOption.value}>
                  {geoOption.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1} className={styles.averageBox}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Parallel Customers:
            </Typography>
          </Grid>
          <Grid item md={2}>
            <TextField
              type="number"
              name="addEventData.tmpService.numberOfParallelCustomer"
              value={tmpService.numberOfParallelCustomer}
              onChange={handleChange}
              onBlur={onBlurParallelCustomer}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <TextField
          name="addEventData.tmpService.additionalInfo"
          value={tmpService.additionalInfo}
          className={addEventDialogStyles.calendarDesc}
          label="Additional Data"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={3}
        />
      </Grid>
    </Grid>
  );
}

TmpServiceContent.propTypes = {
  geoOptions: PropTypes.arrayOf(optionType).isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,
  addEventData: PropTypes.shape({
    providerId: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    eventType: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onBlurServiceTime: PropTypes.func.isRequired,
  onChangeTmpServiceDateTime: PropTypes.func.isRequired,
  onBlurParallelCustomer: PropTypes.func.isRequired,
}
