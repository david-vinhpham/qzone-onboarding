import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { get } from 'lodash';
import { classesType, historyType, tmpServiceType, optionType, providerType, userDetailType } from "types/global";
import { connect } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { ArtTrack, Delete, Edit, Search, BarChart, CheckCircleOutlined } from "@material-ui/icons";
import moment from "moment-timezone";
import {
  deleteTmpService,
  fetchTmpServicesByAdminId,
  editTmpService,
  setTmpServices,
  getScheduleReport,
  setScheduleReportData,
  fetchTmpServicesByProviderId
} from "../../actions/tmpServices";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from 'assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx';
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';
import DeletionModal from "../../shared/deletion-modal";
import { BeatLoader } from "react-spinners";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { css } from "@emotion/core";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import AddEventDialog from "views/Calendar/AddEventDialog";
import { fetchProvidersByBusinessId, createNewEvent, fetchProvidersByBusinessIdSuccess } from "actions/calendar";
import { fetchGeoLocationOptions } from "../../actions/geoOptions";
import { fetchTimezoneOptions } from "../../actions/timezoneOptions";
import { fetchServiceOptionsByBusinessAdminId } from "../../actions/serviceOptions";
import { EVENT_LEVEL, EVENT_REPEAT_TYPE, EVENT_TYPE, REPEAT_DATE_DEF } from "constants/Calendar.constants";
import { generateTmpServicePayload, generateRepeatPayload, createNewEventHelper } from "../Calendar/helpers";
import { defaultDateTimeFormat, eUserType, weekDays } from "constants.js";
import { fetchSurveyOptionsByAssessorId } from "actions/surveyOptions";

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const todayWeekDay = weekDays[moment().day()];

class TmpServicesList extends PureComponent {
  constructor(props) {
    super(props);

    const { history: { location } } = props;
    this.state = {
      isOpenScheduleReport: false,
      deletedTmpService: {
        id: 0,
        isDel: false
      },
      isOpenAddEventDialog: !!location.state,
      ...(location.state
        ? location.state.prevState
        : {
          isEditMode: false,
          eventLevel: EVENT_LEVEL.PROVIDER,
          addEventData: {},
        }
      ),
    };
  }

  componentDidMount() {
    this.userId = localStorage.getItem('userSub');
    if (this.userId) {
      const { userDetail } = this.props;
      if (userDetail.userType === eUserType.provider) {
        this.props.fetchTmpServicesByProviderId(this.userId);
        this.props.fetchServiceOptionsByBusinessAdminId(userDetail.providerInformation.businessId);
        this.props.fetchSurveyOptionsByAssessorId(userDetail.providerInformation.businessId);
        this.props.fetchProvidersByBusinessIdSuccess([userDetail]);
      } else {
        this.props.fetchTmpServicesByAdminId(this.userId);
        this.props.fetchProvidersByBusinessId(this.userId);
        this.props.fetchServiceOptionsByBusinessAdminId(this.userId);
        this.props.fetchSurveyOptionsByAssessorId(this.userId);
      }
    }
    this.props.fetchTimezoneOptions();
    this.props.fetchGeoLocationOptions();
  }

  handleClick(event, history) {
    history.push('/tmp-service/detail/' + event.id);
  }

  handleReportClick(event, history) {
    history.push('/schedule-report/detail/' + event.id);
  }

  handleAvailabilityClick(event, history) {
    history.push('/availability/detail/' + event.id);
  }

  cancelDelete = () => {
    const data = {
      isDel: false
    };
    this.setState({ deletedTmpService: data });
  };

  confirmDelete = eventId => {
    this.props.deleteTmpService(eventId);
    const data = {
      isDel: false
    };
    this.setState({ deletedTmpService: data });
  };

  deleteTmpService(eventId) {
    const data = {
      id: eventId,
      isDel: true
    };
    this.setState({ deletedTmpService: data });
  }

  openEditDialog = event => {
    const localTz = moment().format('Z');
    let repeat = {
      type: EVENT_REPEAT_TYPE.NEVER,
      repeatEnd: {}
    };

    if (event.repeatType) {
      repeat = {
        type: event.repeatType,
        every: event.repeatType === EVENT_REPEAT_TYPE.DAILY
          ? event.repeat.repeatDaily.repeatEvery
          : event.repeat.repeatWeekly.repeatEveryNumWeeks,
        everyDate: event.repeatType === EVENT_REPEAT_TYPE.WEEKLY
          ? event.repeat.repeatWeekly.repeatOn
          : REPEAT_DATE_DEF[0],
        repeatEnd: event.repeatEnd ? {
          afterOccur: event.repeatEnd.afterNumOccurrences,
          onDate: event.repeatEnd.repeatEndOn
            ? moment.tz(event.repeatEnd.repeatEndOn * 1000, event.timezoneId)
              .utcOffset(localTz, true)
              .format()
            : undefined
        } : {},
      }
    }

    this.setState({
      isEditMode: true,
      isOpenAddEventDialog: true,
      addEventData: {
        id: event.id,
        eventType: EVENT_TYPE.TMP_SERVICE,
        description: event.description,
        repeat,
        timezoneId: event.timezoneId,
        serviceId: event.serviceId,
        providerId: event.providerId,
        providerName: event.providerName,
        startTime: moment.tz(event.slot.startTime * 1000, event.timezoneId)
          .utcOffset(localTz, true)
          .format(),
        endTime: moment.tz(event.slot.endTime * 1000, event.timezoneId)
          .utcOffset(localTz, true)
          .format(),
        tmpService: {
          avgServiceTime: event.avgServiceTime,
          breakTimeStart: moment.tz(event.breakTime.breakStart * 1000, event.timezoneId)
            .utcOffset(localTz, true)
            .format(),
          breakTimeEnd: moment.tz(event.breakTime.breakEnd * 1000, event.timezoneId)
            .utcOffset(localTz, true)
            .format(),
          geoLocationId: event.geoLocation.id,
          numberOfParallelCustomer: event.numberOfParallelCustomer,
          serviceId: event.serviceId,
          surveyId: event.surveyId || 'none',
          privacy: event.privacy
        }
      }
    })
  }

  closeAddEventDialog = () => this.setState({ isOpenAddEventDialog: false })

  editTmpService = ({ addEventData }) => {
    const {
      id,
      providerId,
      startTime,
      endTime,
      eventType,
      description,
      repeat,
      tmpService,
      timezoneId
    } = addEventData;
    const selectedTzOffset = moment().tz(timezoneId).format('Z');

    let payload = {
      id,
      description,
      providerId,
      slot: {
        startTime: moment(startTime).utcOffset(selectedTzOffset, true).unix(),
        endTime: moment(endTime).utcOffset(selectedTzOffset, true).unix()
      },
      type: eventType,
      timezoneId,
      ...generateTmpServicePayload(tmpService, selectedTzOffset, this.businessId)
    };

    if (repeat.type !== EVENT_REPEAT_TYPE.NEVER) {
      payload = { ...payload, ...generateRepeatPayload(repeat, selectedTzOffset) };
    }

    this.props.editTmpService(payload);
    this.closeAddEventDialog();
  }

  openAddDialog = () => {
    this.setState(() => {
      const defaultProvider = this.props.providers[0];
      const tempTz = this.props.tzOptions.find(
        tz => {
          const timezone = get(defaultProvider, 'timezone');
          return timezone ? tz.label.toLowerCase() === timezone.toLowerCase() : null;
        }
      );
      const timezoneId = tempTz ? tempTz.label : moment.tz.guess();
      const today = moment();
      const todayWorkingHour = defaultProvider.workingHours.find(wh => wh.day === todayWeekDay);
      const startTime = today
        .hour(todayWorkingHour.startTime.hour)
        .minute(todayWorkingHour.startTime.minute)
        .second(0)
        .format();
      const endTime = today
        .hour(todayWorkingHour.endTime.hour)
        .minute(todayWorkingHour.endTime.minute)
        .second(0)
        .format();
      const breakTimeStart = today.hour(12).minute(0).second(0).format();
      const breakTimeEnd = today.hour(13).minute(0).second(0).format();

      const providerId = get(defaultProvider, 'id', '');
      const providerName = get(defaultProvider, 'name', '');
      const { serviceOptions } = this.props;
      const serviceId = get(serviceOptions, '0.value', 0);
      const serviceDuration = get(serviceOptions, '0.duration', 0);
      const addEventData = {
        eventType: EVENT_TYPE.TMP_SERVICE,
        description: '',
        repeat: {
          type: Object.values(EVENT_REPEAT_TYPE)[0],
          repeatEnd: {}
        },
        timezoneId,
        serviceId,
        providerId,
        providerName,
        startTime,
        endTime,
        tmpService: {
          avgServiceTime: serviceDuration,
          breakTimeStart,
          breakTimeEnd,
          geoLocationId: get(this.props.geoOptions, '0.value', 0),
          numberOfParallelCustomer: 1,
          serviceId,
          surveyId: 'none',
          privacy: true
        }
      };

      return {
        addEventData,
        isEditMode: false,
        isOpenAddEventDialog: true,
      };
    });
  }

  onCreateNewEvent = (payload) => {
    this.closeAddEventDialog();
    createNewEventHelper(payload, this.props.providers, this.props.createNewEvent);
  };

  render() {
    const {
      classes, history, isLoading,
      userDetail, tmpServices
    } = this.props;
    const {
      deletedTmpService, isOpenAddEventDialog, eventLevel,
      addEventData, isEditMode
    } = this.state;
    const isAdmin = userDetail.userType === eUserType.business_admin;

    if (isLoading) {
      return (
        <BeatLoader
          css={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={isLoading}
        />
      );
    }

    const dataTable = (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
              <TableCell className={classes.cellHeaderBold} size="small">Visibility</TableCell>
              <TableCell className={classes.cellHeaderBold}>Provider</TableCell>
              <TableCell className={classes.cellHeaderBold}>Service</TableCell>
              <TableCell className={classes.cellHeaderBold}>Start time</TableCell>
              <TableCell className={classes.cellHeaderBold}>End time</TableCell>
              <TableCell className={classes.cellHeaderBold}>Description</TableCell>
              <TableCell className={classes.cellHeaderBold} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tmpServices.map((event, index) => (
              <TableRow key={event.id} classes={{ root: classes.row }}>
                <TableCell size="small" align="center">{index + 1}</TableCell>
                <TableCell size="small" align="center">
                  {event.privacy && <CheckCircleOutlined color="secondary" />}
                </TableCell>
                <TableCell>{event.providerName}</TableCell>
                <TableCell>{event.serviceName}</TableCell>
                <TableCell data-test-id="tmpServiceStartTime">{moment.tz(event.slot.startTime * 1000, event.timezoneId).format(defaultDateTimeFormat)}</TableCell>
                <TableCell data-test-id="tmpServiceEndTime">{moment.tz(event.slot.endTime * 1000, event.timezoneId).format(defaultDateTimeFormat)}</TableCell>
                <TableCell data-test-id="tmpServiceDescription">
                  {event.description ? event.description.substring(0, 150) : ''}
                </TableCell>
                <TableCell>
                  <Button
                    color="danger"
                    simple
                    justIcon
                  >
                    <Tooltip onClick={() => this.handleReportClick(event, history)}
                      id="tooltip-top"
                      title="Schedule report"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <BarChart />
                    </Tooltip>
                  </Button>
                  <Button color="transparent" simple justIcon>
                    <Tooltip onClick={() => this.handleAvailabilityClick(event, history)}
                      id="tooltip-top"
                      title="View"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <ArtTrack />
                    </Tooltip>
                  </Button>
                  <Button color="success" simple justIcon>
                    <Tooltip
                      id="tooltip-top"
                      title="Edit"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                      onClick={() => this.openEditDialog(event)}
                    >
                      <Edit />
                    </Tooltip>
                  </Button>
                  {isAdmin && <Button
                    onClick={() => this.deleteTmpService(event.id)}
                    color="danger"
                    data-test-id="tmpServiceDeleteBtn"
                    simple
                    justIcon
                  >
                    <Tooltip
                      id="tooltip-top"
                      title="Remove"
                      placement="bottom"
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Delete />
                    </Tooltip>
                  </Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle} data-test-id="tableHeader">Temporary Services</h4>
                </CardText>
                <div>
                  <CustomInput
                    formControlProps={{
                      className: `${classes.top} ${classes.search}`
                    }}
                    inputProps={{
                      placeholder: 'Search',
                      inputProps: {
                        'aria-label': 'Search',
                        className: classes.searchInput
                      }
                    }}
                  />
                  <Button
                    color="white"
                    aria-label="edit"
                    justIcon
                    round>
                    <Search />
                  </Button>
                </div>
                <Button
                  size="sm"
                  className={classes.buttonDisplay}
                  onClick={this.openAddDialog}
                >
                  New Service
                </Button>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        {dataTable}
        {deletedTmpService.isDel && (
          <DeletionModal
            openDialog={deletedTmpService.isDel}
            closeDialog={this.cancelDelete}
            itemDeleteHandler={this.confirmDelete}
            itemId={deletedTmpService.id}
          />
        )}
        {isOpenAddEventDialog && (
          <AddEventDialog
            isEventTypeReadOnly
            isEventLevelReadOnly
            isProviderReadOnly={isEditMode}
            isEditMode={isEditMode}
            eventLevel={eventLevel}
            isOpenAddDialog={isOpenAddEventDialog}
            closeAddDialog={this.closeAddEventDialog}
            addEventData={addEventData}
            createNewEvent={isEditMode ? this.editTmpService : this.onCreateNewEvent}
            history={history}
          />
        )}
      </div>
    );
  }
}

TmpServicesList.propTypes = {
  tmpServices: PropTypes.arrayOf(tmpServiceType).isRequired,
  fetchTmpServicesByAdminId: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  history: historyType.isRequired,
  delTmpServiceLoading: PropTypes.bool.isRequired,
  tzOptions: PropTypes.arrayOf(optionType).isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,
  geoOptions: PropTypes.arrayOf(optionType).isRequired,
  providers: PropTypes.arrayOf(providerType).isRequired,
  fetchProvidersByBusinessId: PropTypes.func.isRequired,
  fetchTimezoneOptions: PropTypes.func.isRequired,
  fetchServiceOptionsByBusinessAdminId: PropTypes.func.isRequired,
  editTmpService: PropTypes.func.isRequired,
  fetchGeoLocationOptions: PropTypes.func.isRequired,
  setTmpServices: PropTypes.func.isRequired,
  createNewEvent: PropTypes.func.isRequired,
  getScheduleReport: PropTypes.func.isRequired,
  reportData: PropTypes.shape({
    filename: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      providerName: PropTypes.string,
      customerName: PropTypes.string,
      customerEmail: PropTypes.string,
      customerPhone: PropTypes.string,
      bookingCode: PropTypes.string,
      startTime: PropTypes.string,
      toTime: PropTypes.string,
      status: PropTypes.string,
    })),
  }),
  setScheduleReportData: PropTypes.func.isRequired,
  isReportLoading: PropTypes.bool.isRequired,
  fetchProvidersByBusinessIdSuccess: PropTypes.func.isRequired,
  fetchTmpServicesByProviderId: PropTypes.func.isRequired,
  userDetail: userDetailType.isRequired,
  fetchSurveyOptionsByAssessorId: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  tmpServices: state.tmpServices.list,
  isLoading: state.tmpServices.isLoading,
  delTmpServiceLoading: state.tmpServices.delTmpServiceLoading,
  providers: state.manageCalendar.providers,
  tzOptions: state.options.timezone.tzOptions,
  serviceOptions: state.options.service.serviceOptions,
  geoOptions: state.options.geo.geoOptions,
  reportData: state.tmpServices.reportData,
  isReportLoading: state.tmpServices.isReportLoading,
  userDetail: state.user.userDetail,
});

const mapDispatchToProps = {
  fetchTmpServicesByAdminId,
  deleteTmpService,
  fetchProvidersByBusinessId,
  fetchTimezoneOptions,
  fetchServiceOptionsByBusinessAdminId,
  editTmpService,
  fetchGeoLocationOptions,
  setTmpServices,
  createNewEvent,
  getScheduleReport,
  setScheduleReportData,
  fetchProvidersByBusinessIdSuccess,
  fetchTmpServicesByProviderId,
  fetchSurveyOptionsByAssessorId
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(
    theme => ({
      ...tableStyle(theme),
      ...listPageStyle
    }),
    { withTheme: true }
  )(TmpServicesList)
);
