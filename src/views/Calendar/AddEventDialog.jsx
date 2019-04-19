import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Grid, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Select, MenuItem, TextField, Chip,
  Checkbox, ListItemText, Radio
} from '@material-ui/core';
import { get, debounce, map, isEmpty, isNaN } from 'lodash';
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers';
import moment from 'moment';
import produce from 'immer';
import PhoneInput from 'react-phone-number-input';
import {
  EVENT_BG_COLOR,
  EVENT_TYPE,
  EVENT_LEVEL,
  EVENT_REPEAT_TYPE,
  REPEAT_EVERY_DEF,
  REPEAT_DATE_DEF,
  REPEAT_END_TYPE,
  EVENT_TYPE_TITLE
} from 'constants/Calendar.constants';
import { providerType, optionType } from 'types/global';
import styles from './AddEventDialog.module.scss';
import TmpServiceContent from './addEventDialog/TmpServiceContent';

class AddEventDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eventLevel: props.eventLevel,
      addEventData: props.addEventData,
      tmpServiceStep: 1
    };
  }

  onSelectEventLevel = ({ target: { value: level } }) => {
    this.props.updateEventLevel(level);
    this.setState(oldState =>
      produce(oldState, draftState => {
        draftState.eventLevel = level;

        if (!oldState.addEventData.providerId && level === EVENT_LEVEL.PROVIDER) {
          draftState.addEventData.providerId = this.props.providers[0].id;
          draftState.addEventData.providerName = this.props.providers[0].name;
        }
      })
    );
  };

  onDescriptionChange = debounce(
    description =>
      this.setState(oldState => ({
        addEventData: { ...oldState.addEventData, description }
      })),
    100
  );

  onSelectProvider = event => {
    const selectedProvider = this.props.providers.find(p => p.id === event.target.value);
    const selectedProviderTz = selectedProvider.timezone;
    const timezoneId = this.props.tzOptions.find(tz => tz.label.toLowerCase() === selectedProviderTz.toLowerCase()).value;
    this.setState(oldState => ({
      addEventData: {
        ...oldState.addEventData,
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        timezoneId
      }
    }));
  };

  onSelectTimezone = event => {
    const timezoneId = event.target.value;
    this.setState(oldState => ({
      addEventData: {
        ...oldState.addEventData,
        timezoneId
      }
    }));
  };

  onSelectService = event => {
    const serviceId = event.target.value;
    this.setState(oldState => ({
      addEventData: {
        ...oldState.addEventData,
        serviceId
      }
    }));
  };

  onChangeCustomerEmail = ({ target: { value } }) => {
    this.setState(({ addEventData }) => ({
      addEventData: {
        ...addEventData,
        customerEmail: value
      }
    }));
  };

  onChangeCustomerName = field => ({ target: { value } }) => {
    this.setState(({ addEventData }) => ({
      addEventData: {
        ...addEventData,
        [`customer${field}`]: value
      }
    }))
  }

  onChangeCustomerPhone = customerMobilePhone => {
    this.setState(({ addEventData }) => ({
      addEventData: {
        ...addEventData,
        customerMobilePhone
      }
    }))
  }

  onChangeEventType = ({ target: { value: eventType } }) => {
    this.setState(oldState => ({
      eventLevel: eventType === EVENT_TYPE.TMP_SERVICE || eventType === EVENT_TYPE.APPOINTMENT
          ? EVENT_LEVEL.PROVIDER : oldState.eventLevel,
      addEventData: {
        ...oldState.addEventData,
        eventType,
        tmpService:
          eventType === EVENT_TYPE.TMP_SERVICE
            ? {
              additionalInfo: '',
              avgServiceTime: 30,
              breakTimeStart: oldState.addEventData.startTime,
              breakTimeEnd: oldState.addEventData.endTime,
              geoLocationId: this.props.geoOptions[0].value,
              numberOfParallelCustomer: 1,
              serviceId: this.props.serviceOptions[0].value,
            } : {}
      }
    }));
  };

  onChangeNewEventDateTime = type => data => {
    const momentData = moment(data);

    if (type === 'date') {
      this.setState(oldState => ({
        addEventData: {
          ...oldState.addEventData,
          startTime: momentData.format(),
          endTime: momentData.clone().add(1, 'hour').format()
        }
      }));
    }

    if (type === 'fromTime') {
      this.setState(
        oldState => ({
          addEventData: {
            ...oldState.addEventData,
            startTime: momentData.format(),
            endTime: moment(oldState.addEventData.endTime).isBefore(momentData)
              ? momentData.clone().add(1, 'hour').format()
              : oldState.addEventData.endTime
          }
        }),
        () => this.onChangeTmpServiceDateTime('fromTime')(momentData.format())
      );
    }

    if (type === 'toTime') {
      this.setState(
        oldState => ({
          addEventData: { ...oldState.addEventData, endTime: momentData.format() }
        }),
        () => this.onChangeTmpServiceDateTime('toTime')(momentData.format())
      );
    }
  };

  onSelectRepeatType = ({ target: { value: repeatType } }) =>
    this.setState(({ addEventData, addEventData: { repeat } }) => ({
      addEventData: {
        ...addEventData,
        repeat: {
          ...repeat,
          type: repeatType,
          every: repeatType === EVENT_REPEAT_TYPE.NEVER ? 0 : REPEAT_EVERY_DEF[repeatType][0],
          everyDate:
            repeatType === EVENT_REPEAT_TYPE.WEEKLY
              ? [moment(addEventData.startTime).format('dddd')]
              : [],
          repeatEnd: {}
        }
      }
    }));

  onSelectRepeatEvery = ({ target: { value: repeatEvery } }) =>
    this.setState(({ addEventData, addEventData: { repeat } }) => ({
      addEventData: {
        ...addEventData,
        repeat: { ...repeat, every: repeatEvery }
      }
    }));

  onSelectRepeatDay = ({ target: { value: options } }) => {
    if (options.length === 0) return;
    this.setState(({ addEventData, addEventData: { repeat } }) => ({
      addEventData: {
        ...addEventData,
        repeat: { ...repeat, everyDate: options }
      }
    }));
  };

  onRepeatEndSelect = ({ target: { value } }) => {
    this.setState(({ addEventData, addEventData: { repeat } }) => ({
      addEventData: {
        ...addEventData,
        repeat: {
          ...repeat,
          repeatEnd: (type => {
            let data = {};
            if (type === REPEAT_END_TYPE.AFTER_NUM_OCCUR) {
              data = { ...data, afterOccur: 10 };
            }
            if (type === REPEAT_END_TYPE.ON_DATE) {
              data = {
                ...data,
                onDate: moment(addEventData.startTime)
                  .clone()
                  .add(1, 'week')
                  .toDate()
              };
            }
            return data;
          })(value)
        }
      }
    }));
  };

  onChangeOccurence = ({ target: { value } }) => {
    if (isNaN(Number(value))) return;
    this.setState(({ addEventData, addEventData: { repeat } }) => ({
      addEventData: {
        ...addEventData,
        repeat: {
          ...repeat,
          repeatEnd: { afterOccur: value.length === 0 ? '' : Number(value) }
        }
      }
    }));
  };

  onBlurOccurence = ({ target: { value } }) => {
    if (this.state.addEventData.repeat.repeatEnd.afterOccur !== undefined && value.length === 0) {
      this.setState(({ addEventData, addEventData: { repeat } }) => ({
        addEventData: {
          ...addEventData,
          repeat: { ...repeat, repeatEnd: { afterOccur: 1 } }
        }
      }));
    }
  };

  onChangeRepeatEndDate = data => {
    this.setState(({ addEventData, addEventData: { repeat } }) => {
      if (moment(addEventData.endTime).isAfter(data, 'days')) return {};
      return {
        addEventData: {
          ...addEventData,
          repeat: { ...repeat, repeatEnd: { onDate: moment(data).toDate() } }
        }
      };
    });
  };

  onClickNext = () => {
    const { addEventData, tmpServiceStep } = this.state;
    if (addEventData.eventType === EVENT_TYPE.TMP_SERVICE && tmpServiceStep === 1) {
      this.setState({ tmpServiceStep: 2 });
    } else {
      this.props.createNewEvent(this.state.addEventData);
    }
  };

  onClickPrevious = () => {
    this.setState({ tmpServiceStep: 1 });
  };

  onChangeAvgServiceTime = ({ target: { value } }) => {
    if (isNaN(Number(value)) || value === null) return;
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: {
          ...tmpService,
          avgServiceTime: value.length === 0 ? value : Number(value)
        }
      }
    }));
  };

  onBlurServiceTime = ({ target: { value } }) => {
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: {
          ...tmpService,
          avgServiceTime: value.length === 0 ? 30 : Number(value)
        }
      }
    }));
  };

  onChangeParallelCustomer = ({ target: { value } }) => {
    if (isNaN(Number(value)) || value === null) return;
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: {
          ...tmpService,
          numberOfParallelCustomer: value.length === 0 ? value : Number(value)
        }
      }
    }));
  };

  onBlurParallelCustomer = ({ target: { value } }) => {
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: {
          ...tmpService,
          numberOfParallelCustomer: value.length === 0 ? 1 : Number(value)
        }
      }
    }));
  };

  onChangeTmpServiceDateTime = type => data => {
    const momentData = moment(data);
    if (type === 'fromTime') {
      this.setState((oldState) => produce(oldState, (draftState) => {
        draftState.addEventData.tmpService.breakTimeStart = momentData.format();
        draftState.addEventData.tmpService.breakTimeEnd = moment(draftState.addEventData.tmpService.breakTimeEnd).isBefore(momentData)
          ? momentData.clone().add(1, 'hour').format()
          : draftState.addEventData.tmpService.breakTimeEnd
      }));
    }

    if (type === 'toTime') {
      this.setState((oldState) => produce(oldState, (draftState) => {
        draftState.addEventData.tmpService.breakTimeEnd = momentData.format();
      }));
    }
  };

  onChangeAdditionInfo = debounce(value => {
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: { ...tmpService, additionalInfo: value }
      }
    }));
  });

  onSelectLocation = ({ target: { value } }) => {
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: { ...tmpService, geoLocationId: value }
      }
    }));
  };

  validateAvgServiceTime = () => {
    const {
      addEventData: {
        tmpService: { avgServiceTime }
      }
    } = this.state;
    if (avgServiceTime < 30) {
      return { helperText: 'Must larger than 30', error: true };
    }
    if (avgServiceTime > 180) {
      return { helperText: 'Must less than 180', error: true };
    }
    return {};
  };

  validateParallelCustomer = () => {
    const {
      addEventData: {
        tmpService: { numberOfParallelCustomer }
      }
    } = this.state;
    if (numberOfParallelCustomer < 1) {
      return { helperText: 'Must be at least 1', error: true };
    }
    if (numberOfParallelCustomer > 50) {
      return { helperText: 'No more than 50', error: true };
    }
    return {};
  };

  validateBreakTimeFrom = () => {
    const {
      addEventData: {
        startTime,
        endTime,
        tmpService: { breakTimeStart, breakTimeEnd }
      }
    } = this.state;
    const value = moment(breakTimeStart);
    if (value.isBefore(startTime) || value.isAfter(endTime) || value.isAfter(breakTimeEnd)) {
      return { error: true };
    }
    return {};
  };

  validateBreakTimeTo = () => {
    const {
      addEventData: {
        startTime,
        endTime,
        tmpService: { breakTimeStart, breakTimeEnd }
      }
    } = this.state;
    const value = moment(breakTimeEnd);
    if (value.isBefore(breakTimeStart) || value.isBefore(startTime) || value.isAfter(endTime)) {
      return { error: true };
    }
    return {};
  };

  onSelectService = event => {
    const service = event.target.value;
    this.setState(oldState => produce(oldState, draftState => {
      draftState.addEventData.tmpService.serviceId = service;
    }));
  };

  renderContent = () => {
    const { providers, tzOptions, serviceOptions } = this.props;
    const { eventLevel, addEventData } = this.state;
    const startTime = moment(addEventData.startTime).toDate();
    const endTime = moment(addEventData.endTime).toDate();

    return (
      <Grid container spacing={8} className={styles.calendarDatetimePicker}>
        <Grid item md={12}>
          <Grid container spacing={8}>
            <Grid item md={2} className={styles.label}>
              <Typography variant="body2" noWrap inline>
                Event type:
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Select
                value={addEventData.eventType}
                onChange={this.onChangeEventType}
                className={styles.eventTypeSelect}
              >
                {Object.values(EVENT_TYPE).map(e => (
                  <MenuItem value={e} key={e}>
                    {EVENT_TYPE_TITLE[e]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
        <>
          <Grid item md={12}>
            <Grid container spacing={8}>
              <Grid item md={2} className={styles.label}>
                <Typography variant="body2" noWrap inline>
                  Level:
                </Typography>
              </Grid>
              <Grid item md={10}>
                <Select
                  value={eventLevel}
                  onChange={this.onSelectEventLevel}
                  className={styles.eventTypeSelect}
                >
                  <MenuItem value={EVENT_LEVEL.PROVIDER}>
                    {EVENT_LEVEL.PROVIDER}
                  </MenuItem>
                  {addEventData.eventType !== EVENT_TYPE.APPOINTMENT
                    && addEventData.eventType !== EVENT_TYPE.TMP_SERVICE &&
                    <MenuItem value={EVENT_LEVEL.BUSINESS}>
                      {EVENT_LEVEL.BUSINESS}
                    </MenuItem>}
                </Select>
              </Grid>
            </Grid>
          </Grid>
          {eventLevel === EVENT_LEVEL.PROVIDER && (
            <Grid item md={12}>
              <Grid container spacing={8}>
                <Grid item md={2} className={styles.label}>
                  <Typography variant="body2" noWrap inline>
                    Provider:
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <Select
                    value={addEventData.providerId}
                    onChange={this.onSelectProvider}
                    className={styles.eventTypeSelect}
                  >
                    {providers.map(provider => (
                      <MenuItem value={provider.id} key={provider.id}>
                        {provider.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          )}
          {addEventData.eventType === EVENT_TYPE.APPOINTMENT &&
            <>
              <Grid item md={12}>
                <Grid container spacing={8}>
                  <Grid item md={2} className={styles.label}>
                    <Typography variant="body2" noWrap inline>
                      Time zone:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Select
                      value={addEventData.timezoneId}
                      onChange={this.onSelectTimezone}
                      className={styles.eventTypeSelect}
                    >
                      {tzOptions.map(tz => (
                        <MenuItem value={tz.value} key={tz.label}>
                          {tz.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container spacing={8}>
                  <Grid item md={2} className={styles.label}>
                    <Typography variant="body2" noWrap inline>
                      Service:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
                    <Select
                      value={addEventData.serviceId}
                      onChange={this.onSelectService}
                      className={styles.eventTypeSelect}
                    >
                      {serviceOptions.map(svc => (
                        <MenuItem value={svc.value} key={svc.label}>
                          {svc.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container spacing={8}>
                  <Grid item md={2} className={styles.label}>
                    <Typography variant="body2" noWrap inline>
                      Customer email:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
                    <TextField
                      fullWidth
                      value={addEventData.customerEmail || ''}
                      onChange={this.onChangeCustomerEmail}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container spacing={8}>
                  <Grid item md={2} className={styles.label}>
                    <Typography variant="body2" noWrap inline>
                      Customer name:
                    </Typography>
                  </Grid>
                  <Grid item md={5}>
                    <TextField
                      fullWidth
                      label="First name"
                      value={addEventData.customerFirstName || ''}
                      onChange={this.onChangeCustomerName('FirstName')}
                    />
                  </Grid>
                  <Grid item md={5}>
                    <TextField
                      fullWidth
                      label="Last name"
                      value={addEventData.customerLastName || ''}
                      onChange={this.onChangeCustomerName('LastName')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container spacing={8}>
                  <Grid item md={2} className={styles.label}>
                    <Typography variant="body2" noWrap inline>
                      Customer phone:
                    </Typography>
                  </Grid>
                  <Grid item md={10}>
                    <PhoneInput
                      country="AU"
                      value={addEventData.customerMobilePhone || ''}
                      onChange={this.onChangeCustomerPhone}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          }
        </>
        <Grid item md={12}>
          <Grid container spacing={8}>
            <Grid item md={2} className={styles.label}>
              <Typography variant="body2" noWrap inline>
                Event date:
              </Typography>
            </Grid>
            <Grid item md={10}>
              <DateFormatInput
                name="StartDateInput"
                value={startTime}
                onChange={this.onChangeNewEventDateTime('date')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={8}>
            <Grid item md={1} className={styles.label}>
              <Typography variant="body2" noWrap inline>
                From
              </Typography>
            </Grid>
            <Grid item md={5}>
              <TimeFormatInput
                name="StartTimeInput"
                value={startTime}
                onChange={this.onChangeNewEventDateTime('fromTime')}
              />
            </Grid>
            <Grid item md={1} className={styles.label}>
              <Typography variant="body2" noWrap inline>
                To
              </Typography>
            </Grid>
            <Grid item md={5}>
              <TimeFormatInput
                name="EndTimeInput"
                value={endTime}
                onChange={this.onChangeNewEventDateTime('toTime')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <TextField
            className={styles.calendarDesc}
            label="Description"
            placeholder="Type a meaningful description about the event"
            margin="normal"
            variant="outlined"
            onChange={({ target: { value } }) => this.onDescriptionChange(value)}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item md={12}>
          <Grid container spacing={8}>
            <Grid item md={2} className={styles.label}>
              <Typography variant="body2" noWrap inline>
                Repeat:
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Select
                value={addEventData.repeat.type}
                onChange={this.onSelectRepeatType}
                className={styles.eventTypeSelect}
              >
                {map(EVENT_REPEAT_TYPE, value => (
                  <MenuItem value={value} key={`EVENT_REPEAT_TYPE-${value}`}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {addEventData.repeat.type !== EVENT_REPEAT_TYPE.NEVER && (
              <>
                <Grid item md={2} className={styles.label}>
                  <Typography variant="body2" noWrap inline>
                    on every
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  <Select
                    value={addEventData.repeat.every}
                    onChange={this.onSelectRepeatEvery}
                    className={styles.eventTypeSelect}
                  >
                    {map(REPEAT_EVERY_DEF[addEventData.repeat.type], value => (
                      <MenuItem value={value} key={`REPEAT_EVERY_DEF-${value}`}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item md={1} className={styles.label}>
                  <Typography variant="body2" noWrap inline>
                    {(() => {
                      if (addEventData.repeat.type === EVENT_REPEAT_TYPE.DAILY) {
                        return addEventData.repeat.every === 1 ? 'day' : 'days';
                      }
                      return addEventData.repeat.every === 1 ? 'week' : 'weeks';
                    })()}
                  </Typography>
                </Grid>
                {addEventData.repeat.type === EVENT_REPEAT_TYPE.WEEKLY && (
                  <Grid item md={12}>
                    <Grid container spacing={8}>
                      <Grid item md={2} className={styles.label}>
                        <Typography variant="body2" noWrap inline>
                          Repeat on:
                        </Typography>
                      </Grid>
                      <Grid item md={10}>
                        <Select
                          multiple
                          value={addEventData.repeat.everyDate}
                          onChange={this.onSelectRepeatDay}
                          renderValue={selected => (
                            <div className={styles.repeatDayChip}>
                              {selected.map(value => (
                                <Chip
                                  key={`REPEAT_DATE_DEF-${value}-Chip`}
                                  label={value}
                                  className={styles.repeatDayChip}
                                />
                              ))}
                            </div>
                          )}
                          className={styles.eventTypeSelect}
                        >
                          {REPEAT_DATE_DEF.map(dateDef => (
                            <MenuItem key={`REPEAT_DATE_DEF-${dateDef}-Menu`} value={dateDef}>
                              <Checkbox
                                checked={addEventData.repeat.everyDate.includes(dateDef)}
                                disabled={
                                  addEventData.repeat.everyDate.includes(dateDef) &&
                                  addEventData.repeat.everyDate.length === 1
                                }
                              />
                              <ListItemText>{dateDef}</ListItemText>
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item md={12}>
                  <div className={styles.repeatEndWrapper}>
                    <Typography variant="body2" noWrap inline>
                      Repeat ends:
                    </Typography>
                    <div>
                      <div className={styles.repeatEndRadio}>
                        <Radio
                          value={REPEAT_END_TYPE.NEVER}
                          onChange={this.onRepeatEndSelect}
                          checked={isEmpty(addEventData.repeat.repeatEnd)}
                        />
                        <Typography variant="body2" noWrap inline>
                          Never
                        </Typography>
                      </div>
                      <div className={styles.repeatEndRadio}>
                        <Radio
                          value={REPEAT_END_TYPE.AFTER_NUM_OCCUR}
                          onChange={this.onRepeatEndSelect}
                          checked={addEventData.repeat.repeatEnd.afterOccur !== undefined}
                        />
                        <Typography variant="body2" inline>
                          After
                        </Typography>
                        <TextField
                          value={addEventData.repeat.repeatEnd.afterOccur || ''}
                          onChange={this.onChangeOccurence}
                          onBlur={this.onBlurOccurence}
                        />
                        <Typography variant="body2" inline>
                          occurrences
                        </Typography>
                      </div>
                      <div className={styles.repeatEndRadio}>
                        <Radio
                          value={REPEAT_END_TYPE.ON_DATE}
                          onChange={this.onRepeatEndSelect}
                          checked={addEventData.repeat.repeatEnd.onDate !== undefined}
                        />
                        <Typography variant="body2" noWrap inline>
                          On:
                        </Typography>
                        <DateFormatInput
                          name="EndDateInput"
                          value={addEventData.repeat.repeatEnd.onDate}
                          onChange={this.onChangeRepeatEndDate}
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { isOpenAddDialog, closeAddDialog, geoOptions, serviceOptions } = this.props;
    const { addEventData, tmpServiceStep } = this.state;
    return (
      <Dialog
        open={isOpenAddDialog}
        onClose={closeAddDialog}
        maxWidth="md"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle
          disableTypography
          classes={{ root: styles.calendarDialogTitle }}
          style={{
            marginBottom: 24,
            backgroundColor: get(EVENT_BG_COLOR[addEventData.eventType], 'backgroundColor', '')
          }}
        >
          <Typography
            variant="h5"
            style={{
              color: get(EVENT_BG_COLOR[addEventData.eventType], 'color', '')
            }}
          >
            Create event
          </Typography>
        </DialogTitle>
        <DialogContent>
          {tmpServiceStep === 1 ?
            this.renderContent() :
            <TmpServiceContent
              geoOptions={geoOptions}
              serviceOptions={serviceOptions}
              addEventData={addEventData}
              onSelectService={this.onSelectService}
              onChangeAvgServiceTime={this.onChangeAvgServiceTime}
              onBlurServiceTime={this.onBlurServiceTime}
              validateAvgServiceTime={this.validateAvgServiceTime}
              onChangeTmpServiceDateTime={this.onChangeTmpServiceDateTime}
              validateBreakTimeFrom={this.validateBreakTimeFrom}
              validateBreakTimeTo={this.validateBreakTimeTo}
              onSelectLocation={this.onSelectLocation}
              onBlurParallelCustomer={this.onBlurParallelCustomer}
              onChangeParallelCustomer={this.onChangeParallelCustomer}
              validateParallelCustomer={this.validateParallelCustomer}
              onChangeAdditionInfo={this.onChangeAdditionInfo}
            />
          }
        </DialogContent>
        <DialogActions classes={{ root: styles.calendarDialogFooter }}>
          {tmpServiceStep === 2 && (
            <Button variant="outlined" onClick={this.onClickPrevious} className={styles.prevButton}>
              Previous
            </Button>
          )}
          <Button variant="outlined" color="primary" onClick={this.onClickNext}>
            {addEventData.eventType === EVENT_TYPE.TMP_SERVICE && tmpServiceStep === 1
              ? 'Next'
              : 'Create'}
          </Button>
          <Button variant="outlined" onClick={closeAddDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddEventDialog.propTypes = {
  eventLevel: PropTypes.string.isRequired,
  providers: PropTypes.arrayOf(providerType).isRequired,
  isOpenAddDialog: PropTypes.bool.isRequired,
  closeAddDialog: PropTypes.func.isRequired,
  addEventData: PropTypes.shape({
    providerId: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    eventType: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  createNewEvent: PropTypes.func.isRequired,
  updateEventLevel: PropTypes.func.isRequired,
  tzOptions: PropTypes.arrayOf(optionType).isRequired,
  geoOptions: PropTypes.arrayOf(optionType).isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,
};

export default connect(state => ({ geoOptions: state.calendarManage.geoOptions }))(AddEventDialog);
