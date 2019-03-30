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
  TextField
} from '@material-ui/core';
import { get } from 'lodash';
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers';
import moment from 'moment';
import produce from 'immer';
import { EVENT_BG_COLOR, EVENT_TYPE, EVENT_LEVEL } from 'constants/Calendar.constants';
import { providerType } from 'types/global';
import styles from './AddEventDialog.module.scss';

class AddEventDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { eventLevel: props.eventLevel, addEventData: props.addEventData };
  }

  static getDerivedStateFromProps(props, state) {
    let newState = null;

    if (props.eventLevel !== state.eventLevel) {
      newState = { eventLevel: props.eventLevel };
    }

    if (Object.keys(props.addEventData).length !== Object.keys(state.addEventData).length) {
      newState = { ...(newState || {}), addEventData: props.addEventData };
    }

    return newState;
  }

  onSelectEventLevel = event => {
    const level = event.target.value;
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

  onDescriptionChange = event => {
    const description = event.target.value;
    this.setState(oldState => ({
      addEventData: { ...oldState.addEventData, description }
    }));
  };

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

  onChangeEventType = event => {
    const eventType = event.target.value;
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

  createNewEvent = () => {
    this.props.createNewEvent(this.state.addEventData);
  };

  render() {
    const { isOpenAddDialog, closeAddDialog, providers } = this.props;
    const { eventLevel, addEventData } = this.state;
    const startTime = moment(addEventData.startTime).toDate();
    const endTime = moment(addEventData.endTime).toDate();

    return (
      <Dialog open={isOpenAddDialog} onClose={closeAddDialog} maxWidth="sm">
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
                    name="date-input"
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
                    name="time-input"
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
                    name="time-input"
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
                onChange={this.onDescriptionChange}
                multiline
                rows={3}
              />
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
  createNewEvent: PropTypes.func.isRequired
};

export default AddEventDialog;
