import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment-timezone';
import produce from 'immer';
import { Formik } from 'formik';
import {
  EVENT_BG_COLOR,
  EVENT_TYPE,
  EVENT_LEVEL,
  EVENT_REPEAT_TYPE,
  REPEAT_EVERY_DEF,
  REPEAT_END_TYPE,
} from 'constants/Calendar.constants';
import { providerType, optionType } from 'types/global';
import styles from './AddEventDialog.module.scss';
import TmpServiceContent from './addEventDialog/TmpServiceContent';
import CommonContent from './addEventDialog/CommonContent';

class AddEventDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { tmpServiceStep: 1 };
  }

  onSelectEventLevel = (setValues, values) => ({ target: { value: level } }) => {
    setValues(produce(values, draftState => {
      draftState.eventLevel = level;

      if (!draftState.addEventData.providerId && level === EVENT_LEVEL.PROVIDER) {
        draftState.addEventData.providerId = this.props.providers[0].id;
        draftState.addEventData.providerName = this.props.providers[0].name;
      }
    })
    );
  };

  onSelectProvider = (setValues, values) => event => {
    const selectedProvider = this.props.providers.find(p => p.id === event.target.value);
    const timezoneId = this.props.tzOptions.find(tz => tz.label.toLowerCase() === selectedProvider.timezone.toLowerCase()).label;
    setValues({
      addEventData: {
        ...values.addEventData,
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        timezoneId
      }
    });
  };

  onChangeEventType = (setValues, values) => ({ target: { value: eventType } }) => {
    setValues({
      eventLevel: eventType === EVENT_TYPE.TMP_SERVICE || eventType === EVENT_TYPE.APPOINTMENT
        ? EVENT_LEVEL.PROVIDER : values.eventLevel,
      addEventData: {
        ...values.addEventData,
        eventType,
        tmpService:
          eventType === EVENT_TYPE.TMP_SERVICE
            ? {
              additionalInfo: '',
              avgServiceTime: 30,
              breakTimeStart: values.addEventData.startTime,
              breakTimeEnd: values.addEventData.endTime,
              geoLocationId: this.props.geoOptions[0].value,
              numberOfParallelCustomer: 1,
              serviceId: this.props.serviceOptions[0].value,
            } : {}
      }
    });
  };

  onChangeNewEventDateTime = (setValues, values) => type => data => {
    const momentData = moment(data);

    if (type === 'date') {
      setValues({
        addEventData: {
          ...values.addEventData,
          startTime: momentData.format(),
          endTime: momentData.clone().add(1, 'hour').format()
        }
      });
    }

    if (type === 'fromTime') {
      setValues({
        addEventData: {
          ...values.addEventData,
          startTime: momentData.format(),
          endTime: moment(values.addEventData.endTime).isBefore(momentData)
            ? momentData.clone().add(1, 'hour').format()
            : values.addEventData.endTime
        }
      });
      this.onChangeTmpServiceDateTime('fromTime')(data);
    }

    if (type === 'toTime') {
      setValues({
        addEventData: { ...values.addEventData, endTime: momentData.format() }
      });
      this.onChangeTmpServiceDateTime('toTime')(data);
    }
  };

  onSelectRepeatType = (setValues, values) => ({ target: { value: repeatType } }) =>
    setValues({
      addEventData: {
        ...values.addEventData,
        repeat: {
          ...values.addEventData.repeat,
          type: repeatType,
          every: repeatType === EVENT_REPEAT_TYPE.NEVER ? 0 : REPEAT_EVERY_DEF[repeatType][0],
          everyDate:
            repeatType === EVENT_REPEAT_TYPE.WEEKLY
              ? [moment(values.addEventData.startTime).format('dddd')]
              : [],
          repeatEnd: {}
        }
      }
    });

  onRepeatEndSelect = (setValues, values) => ({ target: { value } }) => {
    setValues({
      addEventData: {
        ...values.addEventData,
        repeat: {
          ...values.addEventData.repeat,
          repeatEnd: (type => {
            let data = {};
            if (type === REPEAT_END_TYPE.AFTER_NUM_OCCUR) {
              data = { ...data, afterOccur: 10 };
            }
            if (type === REPEAT_END_TYPE.ON_DATE) {
              data = {
                ...data,
                onDate: moment(values.addEventData.startTime)
                  .clone()
                  .add(1, 'week')
                  .format()
              };
            }
            return data;
          })(value)
        }
      }
    });
  };

  onBlurOccurence = (setFieldValue, values) => ({ target: { value } }) => {
    if (values.addEventData.repeat.repeatEnd.afterOccur && value.length === 0) {
      setFieldValue('addEventData.repeat.repeatEnd.afterOccur', 1);
    }
  };

  onChangeRepeatEndDate = (setFieldValue, values) => data => {
    if (moment(values.addEventData.endTime).isBefore(data, 'days')) {
      setFieldValue('addEventData.repeat.repeatEnd.onDate', moment(data).format());
    }
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

  onChangeAdditionInfo = value =>
    this.setState(({ addEventData, addEventData: { tmpService } }) => ({
      addEventData: {
        ...addEventData,
        tmpService: { ...tmpService, additionalInfo: value }
      }
    }));

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

  render() {
    const {
      isOpenAddDialog, closeAddDialog, geoOptions,
      serviceOptions, providers,
      eventLevel, addEventData
    } = this.props;
    const { tmpServiceStep } = this.state;
    return (
      <Dialog
        open={isOpenAddDialog}
        onClose={closeAddDialog}
        maxWidth="md"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <Formik
          initialValues={{ eventLevel, addEventData }}
        >
          {({
            values, errors, handleChange,
            handleBlur, handleSubmit, isSubmitting,
            setValues, setFieldValue
          }) => (
              <>
                <DialogTitle
                  disableTypography
                  classes={{ root: styles.calendarDialogTitle }}
                  style={{
                    marginBottom: 24,
                    backgroundColor: get(EVENT_BG_COLOR[values.addEventData.eventType], 'backgroundColor', '')
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      color: get(EVENT_BG_COLOR[values.addEventData.eventType], 'color', '')
                    }}
                  >
                    Create event
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  {tmpServiceStep === 1 ?
                    <CommonContent
                      values={values}
                      providers={providers}
                      serviceOptions={serviceOptions}
                      errors={errors}
                      handleChange={handleChange}
                      onChangeEventType={this.onChangeEventType(setValues, values)}
                      onSelectEventLevel={this.onSelectEventLevel(setValues, values)}
                      onSelectProvider={this.onSelectProvider(setValues, values)}
                      onChangeNewEventDateTime={this.onChangeNewEventDateTime(setValues, values)}
                      onSelectRepeatType={this.onSelectRepeatType(setValues, values)}
                      onRepeatEndSelect={this.onRepeatEndSelect(setValues, values)}
                      onBlurOccurence={this.onBlurOccurence(setFieldValue, values)}
                      onChangeRepeatEndDate={this.onChangeRepeatEndDate(setFieldValue, values)}
                    /> :
                    <TmpServiceContent
                      geoOptions={geoOptions}
                      serviceOptions={serviceOptions}
                      addEventData={values.addEventData}
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
                      errors={errors}
                      handleChange={handleChange}
                    />
                  }
                </DialogContent>
                <DialogActions classes={{ root: styles.calendarDialogFooter }}>
                  {tmpServiceStep === 2 && (
                    <Button variant="outlined" onClick={this.onClickPrevious} className={styles.prevButton}>
                      Previous
                    </Button>
                  )}
                  <Button variant="outlined" color="primary" onClick={this.onClickNext} disabled={isSubmitting}>
                    {values.addEventData.eventType === EVENT_TYPE.TMP_SERVICE && tmpServiceStep === 1
                      ? 'Next'
                      : 'Create'}
                  </Button>
                  <Button variant="outlined" onClick={closeAddDialog}>
                    Cancel
                  </Button>
                </DialogActions>
              </>
            )}
        </Formik>
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
  tzOptions: PropTypes.arrayOf(optionType).isRequired,
  geoOptions: PropTypes.arrayOf(optionType).isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,
};

export default connect(state => ({ geoOptions: state.calendarManage.geoOptions }))(AddEventDialog);
