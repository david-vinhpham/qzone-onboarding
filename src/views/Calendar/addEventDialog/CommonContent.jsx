import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Grid,
  Select, MenuItem, TextField, Chip,
  Checkbox, ListItemText, Radio
} from '@material-ui/core';
import moment from 'moment-timezone';
import PhoneInput from 'react-phone-number-input';
import { map, isEmpty } from 'lodash';
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers';
import {
  EVENT_LEVEL, EVENT_TYPE, EVENT_TYPE_TITLE,
  EVENT_REPEAT_TYPE, REPEAT_END_TYPE,
  REPEAT_EVERY_DEF, REPEAT_DATE_DEF
} from 'constants/Calendar.constants';
import { providerType, optionType } from 'types/global';
import styles from './CommonContent.module.scss';
import addEventDialogStyles from '../AddEventDialog.module.scss';

export default function CommonContent({
  values, providers, serviceOptions, errors, handleChange,
  onChangeEventType, onSelectEventLevel, onSelectProvider,
  onChangeNewEventDateTime, onSelectRepeatType, onRepeatEndSelect,
  onBlurOccurence, onChangeRepeatEndDate, onChangeCustomerMobilePhone,
  isEditMode
}) {
  const startTime = moment(values.addEventData.startTime).toDate();
  const endTime = moment(values.addEventData.endTime).toDate();
  const repeatUntilDate = values.addEventData.repeat.repeatEnd.onDate
    ? moment(values.addEventData.repeat.repeatEnd.onDate).toDate()
    : undefined;

  return (
    <Grid container spacing={8} className={addEventDialogStyles.calendarDatetimePicker}>
      <Grid item md={12}>
        <Grid container spacing={8}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Event type:
            </Typography>
          </Grid>
          <Grid item md={10}>
            <Select
              name="addEventData.eventType"
              value={values.addEventData.eventType}
              onChange={onChangeEventType}
              className={addEventDialogStyles.eventTypeSelect}
              readOnly={isEditMode}
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
            <Grid item md={2} className={addEventDialogStyles.label}>
              <Typography variant="body2" noWrap inline>
                Level:
              </Typography>
            </Grid>
            <Grid item md={10}>
              <Select
                name="eventLevel"
                value={values.eventLevel}
                onChange={onSelectEventLevel}
                className={addEventDialogStyles.eventTypeSelect}
                readOnly={isEditMode}
              >
                <MenuItem value={EVENT_LEVEL.PROVIDER}>
                  {EVENT_LEVEL.PROVIDER}
                </MenuItem>
                {values.addEventData.eventType !== EVENT_TYPE.APPOINTMENT
                  && values.addEventData.eventType !== EVENT_TYPE.TMP_SERVICE &&
                  <MenuItem value={EVENT_LEVEL.BUSINESS}>
                    {EVENT_LEVEL.BUSINESS}
                  </MenuItem>}
              </Select>
            </Grid>
          </Grid>
        </Grid>
        {values.eventLevel === EVENT_LEVEL.PROVIDER && (
          <>
            <Grid item md={12}>
              <Grid container spacing={8}>
                <Grid item md={2} className={addEventDialogStyles.label}>
                  <Typography variant="body2" noWrap inline>
                    Provider:
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <Select
                    name="addEventData.providerId"
                    value={values.addEventData.providerId}
                    onChange={onSelectProvider}
                    className={addEventDialogStyles.eventTypeSelect}
                    readOnly={isEditMode}
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
            <Grid item md={12}>
              <Grid container spacing={8}>
                <Grid item md={2} className={addEventDialogStyles.label}>
                  <Typography variant="body2" noWrap inline>
                    Time zone:
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <TextField
                    fullWidth
                    readOnly
                    value={values.addEventData.timezoneId}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {values.addEventData.eventType === EVENT_TYPE.APPOINTMENT &&
          <>
            <Grid item md={12}>
              <Grid container spacing={8}>
                <Grid item md={2} className={addEventDialogStyles.label}>
                  <Typography variant="body2" noWrap inline>
                    Service:
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <Select
                    name="addEventData.serviceId"
                    value={values.addEventData.serviceId}
                    onChange={handleChange}
                    className={addEventDialogStyles.eventTypeSelect}
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
                <Grid item md={2} className={addEventDialogStyles.label}>
                  <Typography variant="body2" noWrap inline>
                    Customer email:
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <TextField
                    name="addEventData.customerEmail"
                    fullWidth
                    value={values.addEventData.customerEmail || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={8}>
                <Grid item md={2} className={addEventDialogStyles.label}>
                  <Typography variant="body2" noWrap inline>
                    Customer name:
                  </Typography>
                </Grid>
                <Grid item md={5}>
                  <TextField
                    fullWidth
                    name="addEventData.customerFirstName"
                    label="First name"
                    value={values.addEventData.customerFirstName || ''}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={5}>
                  <TextField
                    fullWidth
                    name="addEventData.customerLastName"
                    label="Last name"
                    value={values.addEventData.customerLastName || ''}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Grid container spacing={8}>
                <Grid item md={2} className={addEventDialogStyles.label}>
                  <Typography variant="body2" noWrap inline>
                    Customer phone:
                  </Typography>
                </Grid>
                <Grid item md={10}>
                  <PhoneInput
                    country="AU"
                    name="addEventData.customerMobilePhone"
                    value={values.addEventData.customerMobilePhone || ''}
                    onChange={onChangeCustomerMobilePhone}
                  />
                </Grid>
              </Grid>
            </Grid>
          </>
        }
      </>
      <Grid item md={12}>
        <Grid container spacing={8}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Event date:
            </Typography>
          </Grid>
          <Grid item md={10}>
            <DateFormatInput
              name="addEventData.startTime"
              value={startTime}
              onChange={onChangeNewEventDateTime('date')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={8}>
          <Grid item md={1} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              From
            </Typography>
          </Grid>
          <Grid item md={5}>
            <TimeFormatInput
              name="addEventData.startTime"
              value={startTime}
              onChange={onChangeNewEventDateTime('fromTime')}
            />
          </Grid>
          <Grid item md={1} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              To
            </Typography>
          </Grid>
          <Grid item md={5}>
            <TimeFormatInput
              name="addEventData.endTime"
              value={endTime}
              onChange={onChangeNewEventDateTime('toTime')}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <TextField
          value={values.addEventData.description}
          className={addEventDialogStyles.calendarDesc}
          label="Description"
          name="addEventData.description"
          placeholder="Type a meaningful description about the event"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={3}
        />
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={8}>
          <Grid item md={2} className={addEventDialogStyles.label}>
            <Typography variant="body2" noWrap inline>
              Repeat:
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Select
              name="addEventData.repeat.type"
              value={values.addEventData.repeat.type}
              onChange={onSelectRepeatType}
              className={addEventDialogStyles.eventTypeSelect}
            >
              {map(EVENT_REPEAT_TYPE, value => (
                <MenuItem value={value} key={`EVENT_REPEAT_TYPE-${value}`}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          {values.addEventData.repeat.type !== EVENT_REPEAT_TYPE.NEVER && (
            <>
              <Grid item md={2} className={addEventDialogStyles.label}>
                <Typography variant="body2" noWrap inline>
                  on every
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Select
                  name="addEventData.repeat.every"
                  value={values.addEventData.repeat.every}
                  onChange={handleChange}
                  className={addEventDialogStyles.eventTypeSelect}
                >
                  {map(REPEAT_EVERY_DEF[values.addEventData.repeat.type], value => (
                    <MenuItem value={value} key={`REPEAT_EVERY_DEF-${value}`}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item md={1} className={addEventDialogStyles.label}>
                <Typography variant="body2" noWrap inline>
                  {(() => {
                    if (values.addEventData.repeat.type === EVENT_REPEAT_TYPE.DAILY) {
                      return values.addEventData.repeat.every === 1 ? 'day' : 'days';
                    }
                    return values.addEventData.repeat.every === 1 ? 'week' : 'weeks';
                  })()}
                </Typography>
              </Grid>
              {values.addEventData.repeat.type === EVENT_REPEAT_TYPE.WEEKLY && (
                <Grid item md={12}>
                  <Grid container spacing={8}>
                    <Grid item md={2} className={addEventDialogStyles.label}>
                      <Typography variant="body2" noWrap inline>
                        Repeat on:
                      </Typography>
                    </Grid>
                    <Grid item md={10}>
                      <Select
                        name="addEventData.repeat.everyDate"
                        value={values.addEventData.repeat.everyDate}
                        onChange={handleChange}
                        renderValue={selected => (
                          <div className={styles.repeatDayChip}>
                            <Chip
                              key={`REPEAT_DATE_DEF-${selected}-Chip`}
                              label={selected}
                              className={styles.repeatDayChip}
                            />
                          </div>
                        )}
                        className={addEventDialogStyles.eventTypeSelect}
                      >
                        {REPEAT_DATE_DEF.map(dateDef => (
                          <MenuItem key={`REPEAT_DATE_DEF-${dateDef}-Menu`} value={dateDef}>
                            <Checkbox
                              checked={values.addEventData.repeat.everyDate.includes(dateDef)}
                              disabled={
                                values.addEventData.repeat.everyDate.includes(dateDef) &&
                                values.addEventData.repeat.everyDate.length === 1
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
                        name="addEventData.repeat.repeatEnd"
                        value={REPEAT_END_TYPE.NEVER}
                        onChange={onRepeatEndSelect}
                        checked={isEmpty(values.addEventData.repeat.repeatEnd)}
                      />
                      <Typography variant="body2" noWrap inline>
                        Never
                      </Typography>
                    </div>
                    <div className={styles.repeatEndRadio}>
                      <Radio
                        name="addEventData.repeat.repeatEnd.afterOccur"
                        value={REPEAT_END_TYPE.AFTER_NUM_OCCUR}
                        onChange={onRepeatEndSelect}
                        checked={!!values.addEventData.repeat.repeatEnd.afterOccur}
                      />
                      <Typography variant="body2" inline>
                        After
                      </Typography>
                      <TextField
                        name="addEventData.repeat.repeatEnd.afterOccur"
                        type="number"
                        value={values.addEventData.repeat.repeatEnd.afterOccur || ''}
                        onChange={handleChange}
                        onBlur={onBlurOccurence}
                      />
                      <Typography variant="body2" inline>
                        occurrences
                      </Typography>
                    </div>
                    <div className={styles.repeatEndRadio}>
                      <Radio
                        name="addEventData.repeat.repeatEnd.onDate"
                        value={REPEAT_END_TYPE.ON_DATE}
                        onChange={onRepeatEndSelect}
                        checked={!!values.addEventData.repeat.repeatEnd.onDate}
                      />
                      <Typography variant="body2" noWrap inline>
                        On:
                      </Typography>
                      <DateFormatInput
                        name="addEventData.repeat.repeatEnd.onDate"
                        value={repeatUntilDate}
                        onChange={onChangeRepeatEndDate}
                      />
                      <TimeFormatInput
                        name="addEventData.repeat.repeatEnd.onDate"
                        value={repeatUntilDate}
                        onChange={onChangeRepeatEndDate}
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
}

CommonContent.propTypes = {
  values: PropTypes.shape({
    eventLevel: PropTypes.string,
    addEventData: PropTypes.object,
  }).isRequired,
  providers: PropTypes.arrayOf(providerType).isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  onChangeEventType: PropTypes.func.isRequired,
  onSelectEventLevel: PropTypes.func.isRequired,
  onSelectProvider: PropTypes.func.isRequired,
  onChangeNewEventDateTime: PropTypes.func.isRequired,
  onSelectRepeatType: PropTypes.func.isRequired,
  onRepeatEndSelect: PropTypes.func.isRequired,
  onBlurOccurence: PropTypes.func.isRequired,
  onChangeRepeatEndDate: PropTypes.func.isRequired,
  onChangeCustomerMobilePhone: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
}
