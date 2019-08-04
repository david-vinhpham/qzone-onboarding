import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment-timezone';
import { Formik } from 'formik';
import {
  EVENT_BG_COLOR,
  EVENT_TYPE,
  EVENT_LEVEL,
  EVENT_REPEAT_TYPE,
  REPEAT_EVERY_DEF,
  REPEAT_END_TYPE,
} from 'constants/Calendar.constants';
import { providerType, optionType, userDetailType, historyType } from 'types/global';
import styles from './AddEventDialog.module.scss';
import TmpServiceContent from './addEventDialog/TmpServiceContent';
import CommonContent from './addEventDialog/CommonContent';

class AddEventDialog extends PureComponent {
  onSelectEventLevel = (setFieldValue, values) => ({ target: { value: level } }) => {
    setFieldValue('eventLevel', level);
    if (!values.addEventData.providerId && level === EVENT_LEVEL.PROVIDER) {
      setFieldValue('addEventData.providerId', this.props.providers[0].id);
      setFieldValue('addEventData.providerName', this.props.providers[0].name);
    }
  };

  onSelectProvider = (setFieldValue) => event => {
    const selectedProvider = this.props.providers.find(p => p.id === event.target.value);
    const timezoneId = this.props.tzOptions.find(tz => tz.label.toLowerCase() === selectedProvider.timezone.toLowerCase()).label;
    setFieldValue('addEventData.providerId', selectedProvider.id);
    setFieldValue('addEventData.providerName', selectedProvider.name);
    setFieldValue('addEventData.timezoneId', timezoneId);
  };

  onChangeEventType = (setFieldValue, values) => ({ target: { value: eventType } }) => {
    setFieldValue('eventLevel', eventType === EVENT_TYPE.TMP_SERVICE
      || eventType === EVENT_TYPE.APPOINTMENT ? EVENT_LEVEL.PROVIDER : values.eventLevel);
    setFieldValue('addEventData.eventType', eventType);
    setFieldValue(
      'addEventData.tmpService',
      eventType === EVENT_TYPE.TMP_SERVICE
        ? {
          additionalInfo: '',
          avgServiceTime: 30,
          breakTimeStart: values.addEventData.startTime,
          breakTimeEnd: values.addEventData.endTime,
          geoLocationId: this.props.geoOptions[0].value,
          numberOfParallelCustomer: 1,
          serviceId: get(this.props.serviceOptions, '0.value', '')
        } : {}
    );
  };

  onChangeNewEventDateTime = (setFieldValue, values) => type => data => {
    const momentData = moment(data);

    if (type === 'date') {
      setFieldValue('addEventData.startTime', momentData.format());
      setFieldValue('addEventData.endTime', momentData.clone().add(1, 'hour').format());

      if (values.addEventData.eventType === EVENT_TYPE.TMP_SERVICE) {
        setFieldValue(
          'addEventData.tmpService.breakTimeStart',
          moment(values.addEventData.tmpService.breakTimeStart)
            .year(momentData.year())
            .month(momentData.month())
            .date(momentData.date())
        );
        setFieldValue(
          'addEventData.tmpService.breakTimeEnd',
          moment(values.addEventData.tmpService.breakTimeEnd)
            .year(momentData.year())
            .month(momentData.month())
            .date(momentData.date())
        );
      }
    }

    if (type === 'fromTime') {
      setFieldValue('addEventData.startTime', momentData.format());
      setFieldValue('addEventData.endTime', moment(values.addEventData.endTime).isBefore(momentData)
        ? momentData.clone().add(1, 'hour').format() : values.addEventData.endTime);
    }

    if (type === 'toTime') {
      setFieldValue('addEventData.endTime', momentData.format());
    }
  };

  onSelectRepeatType = (setFieldValue, values) => ({ target: { value: repeatType } }) => {
    setFieldValue('addEventData.repeat.type', repeatType);
    setFieldValue('addEventData.repeat.every', repeatType === EVENT_REPEAT_TYPE.NEVER ? 0 : REPEAT_EVERY_DEF[repeatType][0]);
    setFieldValue('addEventData.repeat.everyDate', repeatType === EVENT_REPEAT_TYPE.WEEKLY
      ? [moment(values.addEventData.startTime).format('dddd')]
      : []);
    setFieldValue('addEventData.repeat.repeatEnd', {});
  }

  onRepeatEndSelect = (setFieldValue, values) => ({ target: { value } }) => {
    setFieldValue('addEventData.repeat.repeatEnd', (type => {
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
    })(value));
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

  onChangeCustomerMobilePhone = setFieldValue => data => {
    setFieldValue('addEventData.customerMobilePhone', data);
  }

  onClickSubmit = (values) => () => {
    this.props.createNewEvent(values);
  };

  onBlurServiceTime = (setFieldValue) => ({ target: { value } }) => {
    setFieldValue('addEventData.tmpService.avgServiceTime', value.length === 0 ? 30 : Number(value));
  };

  onBlurParallelCustomer = setFieldValue => ({ target: { value } }) => {
    setFieldValue('addEventData.tmpService.numberOfParallelCustomer', value.length === 0 ? 1 : Number(value));
  };

  onChangeTmpServiceDateTime = (setFieldValue, values) => type => data => {
    const momentData = moment(data);
    if (type === 'fromTime') {
      setFieldValue('addEventData.tmpService.breakTimeStart', momentData.format());
      setFieldValue('addEventData.tmpService.breakTimeEnd', moment(values.addEventData.tmpService.breakTimeEnd).isBefore(momentData)
        ? momentData.clone().add(1, 'hour').format()
        : values.addEventData.tmpService.breakTimeEnd
      );
    }

    if (type === 'toTime') {
      setFieldValue('addEventData.tmpService.breakTimeEnd', momentData.format());
    }
  };

  addNewLocation = values => () => {
    const { history, isEditMode } = this.props;
    history.push('/location/create', {
      prevPage: history.location.pathname,
      prevState: { ...values, isEditMode }
    });
  }

  render() {
    const {
      isOpenAddDialog, closeAddDialog, geoOptions,
      serviceOptions, providers,
      eventLevel, addEventData, isEditMode,
      isEventTypeReadOnly,
      isEventLevelReadOnly,
      isProviderReadOnly,
      userDetail,
    } = this.props;

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
          render={({
            values, handleChange,
            isSubmitting,
            setFieldValue
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
                    {`${isEditMode ? 'Edit' : 'Create'}`} event
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <CommonContent
                    userDetail={userDetail}
                    values={values}
                    providers={providers}
                    serviceOptions={serviceOptions}
                    handleChange={handleChange}
                    onChangeEventType={this.onChangeEventType(setFieldValue, values)}
                    onSelectEventLevel={this.onSelectEventLevel(setFieldValue, values)}
                    onSelectProvider={this.onSelectProvider(setFieldValue, values)}
                    onChangeNewEventDateTime={this.onChangeNewEventDateTime(setFieldValue, values)}
                    onSelectRepeatType={this.onSelectRepeatType(setFieldValue, values)}
                    onRepeatEndSelect={this.onRepeatEndSelect(setFieldValue, values)}
                    onBlurOccurence={this.onBlurOccurence(setFieldValue, values)}
                    onChangeRepeatEndDate={this.onChangeRepeatEndDate(setFieldValue, values)}
                    onChangeCustomerMobilePhone={this.onChangeCustomerMobilePhone(setFieldValue)}
                    isEventTypeReadOnly={isEventTypeReadOnly}
                    isEventLevelReadOnly={isEventLevelReadOnly}
                    isProviderReadOnly={isProviderReadOnly}
                  />
                  {values.addEventData.eventType === EVENT_TYPE.TMP_SERVICE && <TmpServiceContent
                    geoOptions={geoOptions}
                    serviceOptions={serviceOptions}
                    addEventData={values.addEventData}
                    handleChange={handleChange}
                    onBlurServiceTime={this.onBlurServiceTime(setFieldValue, values)}
                    onChangeTmpServiceDateTime={this.onChangeTmpServiceDateTime(setFieldValue, values)}
                    onBlurParallelCustomer={this.onBlurParallelCustomer(setFieldValue)}
                    addNewLocation={this.addNewLocation(values)}
                    userDetail={userDetail}
                  />}
                </DialogContent>
                <DialogActions classes={{ root: styles.calendarDialogFooter }}>
                  <Button variant="outlined" color="primary" onClick={this.onClickSubmit(values)} disabled={isSubmitting}>
                    {isEditMode ? 'Edit' : 'Create'}
                  </Button>
                  <Button variant="outlined" onClick={closeAddDialog}>
                    Cancel
                  </Button>
                </DialogActions>
              </>
            )}
        />
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
  isEditMode: PropTypes.bool,
  isEventTypeReadOnly: PropTypes.bool,
  isEventLevelReadOnly: PropTypes.bool,
  isProviderReadOnly: PropTypes.bool,
  userDetail: userDetailType.isRequired,
  history: historyType.isRequired
};

AddEventDialog.defaultProps = {
  isEditMode: false,
  isEventTypeReadOnly: false,
  isEventLevelReadOnly: false,
  isProviderReadOnly: false
};

export default connect(state => ({
  geoOptions: state.options.geo.geoOptions,
  userDetail: state.user.userDetail,
}))(AddEventDialog);
