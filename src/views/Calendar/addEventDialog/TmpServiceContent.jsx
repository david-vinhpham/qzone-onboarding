import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid, Link, MenuItem, Select, TextField, Tooltip, Typography} from '@material-ui/core';
import moment from 'moment-timezone';
import {LiveHelp} from '@material-ui/icons';
import {TimePicker} from '@material-ui/pickers'
import addEventDialogStyles from '../AddEventDialog.module.scss';
import styles from './TmpServiceContent.module.scss';
import {optionType, userDetailType} from 'types/global';
import {eUserType} from 'constants.js';
import Checkbox from "@material-ui/core/Checkbox";

export default function TmpServiceContent({
  geoOptions,
  serviceOptions,
  addEventData: { tmpService, startTime, endTime },
  handleChange,
  onBlurServiceTime,
  onChangeTmpServiceDateTime,
  onBlurParallelCustomer,
  addNewLocation,
  userDetail,
  surveyOptions,
}) {
  const breakStartTime = moment(tmpService.breakTimeStart).toDate();
  const breakEndTime = moment(tmpService.breakTimeEnd).toDate();
  const isAdmin = userDetail.userType === eUserType.business_admin;

  return (
    <Grid container spacing={1} className={addEventDialogStyles.wrapper}>
      <Grid item md={12}>
        <Grid container spacing={1}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Assessment:
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Select
              name="addEventData.tmpService.surveyId"
              value={tmpService.surveyId}
              onChange={handleChange}
              className={addEventDialogStyles.eventTypeSelect}
            >
              <MenuItem value="none">
                None
              </MenuItem>
              {surveyOptions.map(svc => (
                <MenuItem value={svc.value} key={svc.value}>
                  {svc.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
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
              Service time:
            </Typography>
          </Grid>
          <Grid item md={2}>
            <TextField
              data-test-id="avgServiceTimeInput"
              type="number"
              name="addEventData.tmpService.avgServiceTime"
              value={tmpService.avgServiceTime}
              onChange={handleChange}
              onBlur={onBlurServiceTime}
            />
          </Grid>
          <Grid item md={3}>
            <Typography variant="body2" display="inline" noWrap>
              minutes (if set 0, will get it from service duration)
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
                moment(startTime).format('LT')
                } and ${
                moment(endTime).format('LT')
                }`
              }
            >
              <LiveHelp fontSize="small" className={styles.breakTimeIcon} />
            </Tooltip>
          </Grid>
          <Grid item md={2}>
            <TimePicker
              name="addEventData.tmpService.breakTimeStart"
              value={breakStartTime}
              onChange={onChangeTmpServiceDateTime('fromTime')}
            />
          </Grid>
          <Grid item md={1} className={addEventDialogStyles.label}>
            <Typography variant="body2">
              To
            </Typography>
          </Grid>
          <Grid item md={2}>
            <TimePicker
              name="addEventData.tmpService.breakTimeEnd"
              value={breakEndTime}
              onChange={onChangeTmpServiceDateTime('toTime')}
            />
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
          <Grid item md={isAdmin ? 8 : 10}>
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
          {isAdmin && <Grid item md={2}>
            <Button fullWidth size="small" variant="contained" color="primary" onClick={addNewLocation}>
              New location
            </Button>
          </Grid>}
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={1} className={styles.averageBox}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Parallel customers:
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
        <Grid container spacing={1}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" display="inline" noWrap>
              Publicity:
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Checkbox
              name="addEventData.tmpService.privacy"
              checked={tmpService.privacy}
              onChange={handleChange}
            />
            <Typography variant="caption" display="inline">
              The service is visible in&nbsp;
              <Link
                title="Custweb"
                href="https://custweb.quezone.com.au"
                target="_blank"
                rel="noreferrer"
              >
                Custweb
              </Link>
            </Typography>
          </Grid>
        </Grid>
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
  addNewLocation: PropTypes.func.isRequired,
  userDetail: userDetailType.isRequired,
  surveyOptions: PropTypes.arrayOf(optionType).isRequired,
}
