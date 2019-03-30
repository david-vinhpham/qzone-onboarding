import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  TextField,
  Chip,
  Checkbox,
  ListItemText,
  Radio
} from '@material-ui/core';
import { get, debounce, map, isEmpty, isNaN } from 'lodash';
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers';
import moment from 'moment';
import produce from 'immer';
import {
  EVENT_BG_COLOR,
  EVENT_TYPE,
  EVENT_LEVEL,
  EVENT_REPEAT_TYPE,
  REPEAT_EVERY_DEF,
  REPEAT_DATE_DEF,
  REPEAT_END_TYPE
} from 'constants/Calendar.constants';
import { providerType } from 'types/global';
import styles from './AddEventDialog.module.scss';

class AddEventDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { eventLevel: props.eventLevel, addEventData: props.addEventData };
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
    const provider = this.props.providers.find(p => p.id === event.target.value);
    this.setState(oldState => ({
      addEventData: {
        ...oldState.addEventData,
        providerId: provider.id,
        providerName: provider.name
      }
    }));
  };

  onChangeEventType = ({ target: { value: eventType } }) => {
    this.setState(oldState => ({
      addEventData: { ...oldState.addEventData, eventType }
    }));
  };

  onChangeNewEventDateTime = type => data => {
    const momentData = moment(data);

    if (type === 'date') {
      this.setState(oldState => ({
        addEventData: {
          ...oldState.addEventData,
          startTime: momentData.format(),
          endTime: momentData.add(1, 'hour').format()
        }
      }));
    }

    if (type === 'fromTime') {
      this.setState(oldState => ({
        addEventData: {
          ...oldState.addEventData,
          startTime: momentData.format(),
          endTime: moment(oldState.addEventData.endTime).isBefore(momentData)
            ? momentData.add(1, 'hour').format()
            : oldState.addEventData.endTime
        }
      }));
    }

    if (type === 'toTime') {
      this.setState(oldState => ({
        addEventData: { ...oldState.addEventData, endTime: momentData.format() }
      }));
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
        repeat: { ...repeat, repeatEnd: { afterOccur: value.length === 0 ? '' : Number(value) } }
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

  createNewEvent = () => {
    this.props.createNewEvent(this.state.addEventData);
  };

  render() {
    const { isOpenAddDialog, closeAddDialog, providers } = this.props;
    const { eventLevel, addEventData } = this.state;
    const startTime = moment(addEventData.startTime).toDate();
    const endTime = moment(addEventData.endTime).toDate();

    return (
      <Dialog open={isOpenAddDialog} onClose={closeAddDialog} maxWidth="md">
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
            style={{ color: get(EVENT_BG_COLOR[addEventData.eventType], 'color', '') }}
          >
            Create event
          </Typography>
        </DialogTitle>
        <DialogContent>
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
                        {e}
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
                      {Object.values(EVENT_LEVEL).map(e => (
                        <MenuItem value={e} key={e}>
                          {e}
                        </MenuItem>
                      ))}
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
        </DialogContent>
        <DialogActions classes={{ root: styles.calendarDialogFooter }}>
          <Button variant="outlined" color="primary" onClick={this.createNewEvent}>
            Create
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
    startTim: PropTypes.instanceOf(moment),
    endTime: PropTypes.instanceOf(moment),
    eventType: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  createNewEvent: PropTypes.func.isRequired,
  updateEventLevel: PropTypes.func.isRequired
};

export default AddEventDialog;
