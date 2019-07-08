import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { classesType, historyType, tmpServiceType, optionType, providerType } from "types/global";
import { connect } from "react-redux";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import moment from "moment-timezone";
import { deleteTmpService, fetchTmpServices, editTmpService, setTmpServices } from "../../actions/tmpServices";
import tableStyle from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from 'assets/jss/material-dashboard-pro-react/views/listPageStyle.jsx';
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';
import DeletionModal from "../../shared/deletion-modal";
import { BeatLoader } from "react-spinners";
import ArtTrack from "@material-ui/icons/ArtTrack";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardText from "../../components/Card/CardText.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { css } from "@emotion/core";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import Search from "@material-ui/icons/Search";
import AddEventDialog from "views/Calendar/AddEventDialog";
import { fetchProvidersByBusinessId, fetchGeoLocationOptions, createNewEvent } from "actions/calendar";
import { fetchTimezoneOptions } from "../../actions/timezoneOptions";
import { fetchServiceOptionsByBusinessAdminId } from "../../actions/serviceOptions";
import { EVENT_LEVEL, EVENT_REPEAT_TYPE, EVENT_TYPE } from "constants/Calendar.constants";
import { generateTmpServicePayload, generateRepeatPayload, createNewEventHelper } from "../Calendar/helpers";
import { defaultDateTimeFormat } from "constants.js";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class TmpServicesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      deletedTmpService: {
        id: 0,
        isDel: false
      },
      isOpenAddEventDialog: false,
      isEditMode: false,
      eventLevel: EVENT_LEVEL.PROVIDER,
      addEventData: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tmpServices != null && nextProps.tmpServices.length > 0 && !nextProps.delTmpServiceLoading) {
      this.setState({ data: nextProps.tmpServices });
      localStorage.setItem('tmpServices', JSON.stringify(nextProps.tmpServices));
    }
    else {
      this.setState({ data: nextProps.tmpServices });
    }
  }

  componentDidMount() {
    const tmpServices = JSON.parse(localStorage.getItem('tmpServices'));
    this.businessId = localStorage.getItem('userSub');
    if (tmpServices !== null && tmpServices.length > 0) {
      this.setState({ data: tmpServices });
      this.props.setTmpServices(tmpServices);
    } else {
      this.props.fetchTmpServices(this.businessId);
    }

    if (this.props.providers.length === 0) {
      this.props.fetchProvidersByBusinessId(this.businessId);
    }
    if (this.props.tzOptions.length === 0) {
      this.props.fetchTimezoneOptions();
    }
    if (this.props.serviceOptions.length === 0) {
      this.props.fetchServiceOptionsByBusinessAdminId(this.businessId);
    }
    if (this.props.geoOptions.length === 0) {
      this.props.fetchGeoLocationOptions();
    }
  }

  handleClick(event, history) {
    history.push('/tmp-service/detail/' + event.id);
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
          ? [event.repeat.repeatWeekly.repeatOn]
          : [],
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
          additionalInfo: event.additionalInfo || '',
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
      tmpService
    } = addEventData;
    const providerTzOffset = moment().tz(addEventData.timezoneId).format('Z');

    let payload = {
      id,
      description,
      providerId,
      slot: {
        startTime: moment(startTime).utcOffset(providerTzOffset, true).unix(),
        endTime: moment(endTime).utcOffset(providerTzOffset, true).unix()
      },
      type: eventType,
      ...generateTmpServicePayload(tmpService, providerTzOffset, this.businessId)
    };

    if (repeat.type !== EVENT_REPEAT_TYPE.NEVER) {
      payload = { ...payload, ...generateRepeatPayload(repeat, providerTzOffset) };
    }

    this.props.editTmpService(payload);
    this.closeAddEventDialog();
  }

  openAddDialog = () => {
    this.setState(() => {
      const defaultProvider = this.props.providers[0];
      const timezoneId = this.props.tzOptions.find(
        tz => tz.label.toLowerCase() === defaultProvider.timezone.toLowerCase()
      ).label;
      const startTime = moment().format();
      const endTime = moment().add(1, 'hour').format();

      const addEventData = {
        eventType: EVENT_TYPE.TMP_SERVICE,
        description: '',
        repeat: {
          type: Object.values(EVENT_REPEAT_TYPE)[0],
          repeatEnd: {}
        },
        timezoneId,
        serviceId: this.props.serviceOptions.length > 0 ? this.props.serviceOptions[0].value : 0,
        providerId: defaultProvider.id,
        providerName: defaultProvider.name,
        startTime,
        endTime,
        tmpService: {
          additionalInfo: '',
          avgServiceTime: 30,
          breakTimeStart: startTime,
          breakTimeEnd: endTime,
          geoLocationId: this.props.geoOptions[0].value,
          numberOfParallelCustomer: 1,
          serviceId: this.props.serviceOptions[0].value,
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
      classes, history, isLoading, tmpServiceError,
      providers, tzOptions, serviceOptions
    } = this.props;
    let data = [];
    const { deletedTmpService, isOpenAddEventDialog, eventLevel, addEventData, isEditMode } = this.state;

    if (isLoading) {
      return (
        <BeatLoader
          className={override}
          sizeUnit="px"
          size={22}
          color="#e91e63"
          loading={isLoading}
        />
      );
    }
    data = (
      <Paper>
        {tmpServiceError !== null && tmpServiceError.length > 0 ? (<div className="alert alert-danger">{tmpServiceError}</div>) : null}
        <Table aria-labelledby="tmpServicesList">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
              <TableCell className={classes.cellHeaderBold}>Provider</TableCell>
              <TableCell className={classes.cellHeaderBold}>Service</TableCell>
              <TableCell className={classes.cellHeaderBold}>Start time</TableCell>
              <TableCell className={classes.cellHeaderBold}>End time</TableCell>
              <TableCell className={classes.cellHeaderBold}>Description</TableCell>
              <TableCell className={classes.cellHeaderBold}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((event, index) => (
              <TableRow key={event.id} classes={{ root: classes.row }}>
                <TableCell size="small">{index + 1}</TableCell>
                <TableCell>{event.providerName}</TableCell>
                <TableCell>{event.serviceName}</TableCell>
                <TableCell>{moment.tz(event.slot.startTime * 1000, event.timezoneId).format(defaultDateTimeFormat)}</TableCell>
                <TableCell>{moment.tz(event.slot.endTime * 1000, event.timezoneId).format(defaultDateTimeFormat)}</TableCell>
                <TableCell>
                  {event.description ? event.description.substring(0, 150) : ''}
                </TableCell>
                <TableCell>
                  <Tooltip onClick={() => this.handleClick(event, history)}
                    id="tooltip-top"
                    title="View"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button color="transparent" simple justIcon>
                      <ArtTrack className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Edit"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                    onClick={() => this.openEditDialog(event)}
                  >
                    <Button color="success" simple justIcon>
                      <Edit className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    id="tooltip-top"
                    title="Remove"
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      onClick={() => this.deleteTmpService(event.id)}
                      color="danger"
                      simple
                      justIcon
                    >
                      <Delete className={classes.underChartIcons} />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );

    const deletionPopup = deletedTmpService.isDel ? (
      <DeletionModal
        openDialog={deletedTmpService.isDel}
        closeDialog={this.cancelDelete}
        itemDeleteHandler={this.confirmDelete}
        itemId={deletedTmpService.id}
      />
    ) : null;

    return (
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardText color="rose">
                  <h4 className={classes.cardTitle}>List temporary services</h4>
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
                  New temporary service
                </Button>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>
        {data}
        {deletionPopup}
        {isOpenAddEventDialog && (
          <AddEventDialog
            isEventTypeReadOnly
            isEventLevelReadOnly
            isProviderReadOnly={isEditMode}
            isEditMode={isEditMode}
            eventLevel={eventLevel}
            providers={providers}
            isOpenAddDialog={isOpenAddEventDialog}
            closeAddDialog={this.closeAddEventDialog}
            addEventData={addEventData}
            createNewEvent={isEditMode ? this.editTmpService : this.onCreateNewEvent}
            tzOptions={tzOptions}
            serviceOptions={serviceOptions}
          />
        )}
      </div>
    );
  }
}

TmpServicesList.propTypes = {
  tmpServices: PropTypes.arrayOf(tmpServiceType).isRequired,
  fetchTmpServices: PropTypes.func.isRequired,
  classes: classesType.isRequired,
  history: historyType.isRequired,
  delTmpServiceLoading: PropTypes.bool.isRequired,
  tmpServiceError: PropTypes.bool,
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
};

TmpServicesList.defaultProps = {
  tmpServiceError: null,
};

const mapStateToProps = state => ({
  tmpServices: state.tmpServices.list,
  isLoading: state.tmpServices.isLoading,
  delTmpServiceLoading: state.tmpServices.delTmpServiceLoading,
  tmpServiceError: state.tmpServices.tmpServiceError,
  providers: state.calendarManage.providers,
  tzOptions: state.timezoneOptions.tzOptions,
  serviceOptions: state.serviceOptions.serviceOptions,
  geoOptions: state.calendarManage.geoOptions
});

const mapDispatchToProps = {
  fetchTmpServices,
  deleteTmpService,
  fetchProvidersByBusinessId,
  fetchTimezoneOptions,
  fetchServiceOptionsByBusinessAdminId,
  editTmpService,
  fetchGeoLocationOptions,
  setTmpServices,
  createNewEvent,
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
