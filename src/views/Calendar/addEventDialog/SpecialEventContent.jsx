import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid,
  Select, MenuItem,
  TextField, Tooltip
} from '@material-ui/core';
import moment from 'moment';
import { LiveHelp } from '@material-ui/icons';
import { TimeFormatInput } from 'material-ui-next-pickers';
import addEventDialogStyles from '../AddEventDialog.module.scss';
import styles from './SpecialEventContent.module.scss';
import { optionType } from 'types/global';

export default function SpecialEventContent({
  geoOptions,
  serviceOptions,
  addEventData: { special, startTime, endTime },
  onSelectService, onChangeAvgServiceTime,
  onBlurServiceTime, validateAvgServiceTime,
  onChangeSpecialDateTime, validateBreakTimeFrom,
  validateBreakTimeTo, onSelectLocation,
  onBlurParallelCustomer, onChangeParallelCustomer,
  validateParallelCustomer, onChangeAdditionInfo
}) {
  const breakStartTime = moment(special.breakTimeStart).toDate();
  const breakEndTime = moment(special.breakTimeEnd).toDate();

  return (
    <Grid container spacing={8} className={addEventDialogStyles.calendarDatetimePicker}>
      <Grid item md={12}>
        <Grid container spacing={8}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Service:
              </Typography>
          </Grid>
          <Grid item md={10}>
            <Select
              value={special.serviceId}
              onChange={onSelectService}
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
        <Grid container spacing={8} className={styles.averageBox}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Average Service Time:
              </Typography>
          </Grid>
          <Grid item md={2}>
            <TextField
              value={special.avgServiceTime}
              onChange={onChangeAvgServiceTime}
              onBlur={onBlurServiceTime}
              {...validateAvgServiceTime()}
            />
          </Grid>
          <Grid item md={3}>
            <Typography variant="body2" noWrap inline>
              minutes
              </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} className={styles.breakTimeWrapper}>
        <Grid container spacing={8}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2">
              Break time:
              </Typography>
            <Tooltip
              title={`Must be between ${
                moment(startTime).format('LT')
                } and ${
                moment(endTime).format('LT')
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
                  name="StartBreakTimeInput"
                  value={breakStartTime}
                  onChange={onChangeSpecialDateTime('fromTime')}
                  {...validateBreakTimeFrom()}
                />
              </Grid>
              <Grid item md={2} className={addEventDialogStyles.label}>
                <Typography variant="body2">
                  to
                  </Typography>
              </Grid>
              <Grid item md={5}>
                <TimeFormatInput
                  name="EndBreakTimeInput"
                  value={breakEndTime}
                  onChange={onChangeSpecialDateTime('toTime')}
                  {...validateBreakTimeTo()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={8}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Location:
              </Typography>
          </Grid>
          <Grid item md={10}>
            <Select
              value={special.geoLocationId}
              onChange={onSelectLocation}
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
        <Grid container spacing={8} className={styles.averageBox}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Parallel Customers:
              </Typography>
          </Grid>
          <Grid item md={2}>
            <TextField
              value={special.numberOfParallelCustomer}
              onChange={onChangeParallelCustomer}
              onBlur={onBlurParallelCustomer}
              {...validateParallelCustomer()}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <TextField
          className={addEventDialogStyles.calendarDesc}
          label="Additional Data"
          margin="normal"
          variant="outlined"
          onChange={({ target: { value } }) => onChangeAdditionInfo(value)}
          multiline
          rows={3}
        />
      </Grid>
    </Grid>
  );
}

SpecialEventContent.propTypes = {
  geoOptions: PropTypes.arrayOf(optionType).isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,
  addEventData: PropTypes.shape({
    providerId: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    eventType: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  onSelectService: PropTypes.func.isRequired,
  onChangeAvgServiceTime: PropTypes.func.isRequired,
  onBlurServiceTime: PropTypes.func.isRequired,
  validateAvgServiceTime: PropTypes.func.isRequired,
  onChangeSpecialDateTime: PropTypes.func.isRequired,
  validateBreakTimeFrom: PropTypes.func.isRequired,
  validateBreakTimeTo: PropTypes.func.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
  onBlurParallelCustomer: PropTypes.func.isRequired,
  onChangeParallelCustomer: PropTypes.func.isRequired,
  validateParallelCustomer: PropTypes.func.isRequired,
  onChangeAdditionInfo: PropTypes.func.isRequired,
}
