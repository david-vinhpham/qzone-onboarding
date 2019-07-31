import React, { PureComponent } from 'react'
import Button from "../../components/CustomButtons/Button";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import GridContainer from "../../components/Grid/GridContainer";
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import tableStyle from "../../assets/jss/material-dashboard-pro-react/components/tableStyle";
import listPageStyle from "../../assets/jss/material-dashboard-pro-react/views/listPageStyle";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper, Select,
  Table, TableBody, TableCell,
  TableHead, TableRow,
  FormControlLabel,
  Checkbox, Typography,
  CircularProgress
} from "@material-ui/core";
import {
  fetchFlowBoard,
  updateCustomerStatus,
  verifyBookingCode,
  fetchProviderOptionsByBusinessAdminId,
  fetchProvidersAndServicesByBusinessAdminId
} from "../../actions/customerService";
import { fetchServiceOptionsByBusinessAdminId } from "../../actions/serviceOptions";
import PropTypes from "prop-types";
import CustomInput from "../../components/CustomInput/CustomInput";
import { defaultDateTimeFormat, eventStatus, boardMode } from "constants.js";
import moment from "moment-timezone";
import { verifyBookingCodeType, customerFlowBoardType, optionType } from "types/global";
import customerServiceStyle from 'assets/jss/material-dashboard-pro-react/views/customerService';

class CustomerService extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bookingCode: '',
      defaultService: '',
      defaultProvider: '',
      confirmChangeStatusDialogOpen: false,
      customerFlowDetailItem: {},
      toStatus: eventStatus.checkedIn
    };
  }

  componentDidMount() {
    const userSub = localStorage.getItem('userSub');
    if (userSub) {
      this.props.fetchProvidersAndServicesByBusinessAdminId(userSub);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.defaultService === ''
      && nextProps.serviceOptions.length > 0
      && this.state.defaultProvider === ''
      && nextProps.providerOptions.length > 0) {
      this.setState({
        defaultService: nextProps.serviceOptions[0].value,
        defaultProvider: nextProps.providerOptions[0].value
      });
      this.getFlowBoardData({
        providerId: nextProps.providerOptions[0].value,
        serviceId: nextProps.serviceOptions[0].value
      });
    }
  };

  onChangeProviderOrService = (e, stateKey) => {
    this.setState({
      [stateKey]: e.target.value,
    }, () => {
      this.getFlowBoardData({
        providerId: this.state.defaultProvider,
        serviceId: this.state.defaultService
      });
    });
  };

  onBookingCodeChange = (e) => {
    this.setState({
      bookingCode: e.target.value
    })
  };

  onUpdateStatusSuccess = (providerId, serviceId) => {
    this.setState(
      { defaultProvider: providerId, defaultService: serviceId },
      () => {
        this.getFlowBoardData({
          providerId: this.state.defaultProvider,
          serviceId: this.state.defaultService
        });
      }
    );
  }

  updateStatus = (data, status, isFromBookingData = false) => {
    this.props.updateCustomerStatus(
      {
        eventId: data.eventId,
        status,
        timezoneId: data.timezoneId,
        isFromBookingData,
        providerId: data.providerId,
        serviceId: data.serviceId
      },
      this.onUpdateStatusSuccess
    );
    this.handleConfirmChangeStatusDialogClose();
  };

  getFlowBoardData = ({ providerId, serviceId }) => {
    this.props.fetchFlowBoard({
      endTime: 0,
      providerId,
      serviceId,
      startTime: 0
    })
  };

  verifyCode = () => {
    this.props.verifyBookingCode(this.state.bookingCode);
  };

  handleConfirmChangeStatusDialogClose = () => {
    this.setState({
      confirmChangeStatusDialogOpen: false
    })
  };

  handleConfirmChangeStatus = (customerFlowDetailItem, toStatus) => {
    this.setState({
      confirmChangeStatusDialogOpen: true,
      customerFlowDetailItem,
      toStatus
    });
  };

  getDisplayStatus = (status) => {
    switch (status) {
      case eventStatus.checkedIn:
        return 'Checked in';
      case eventStatus.started:
        return 'Started';
      case eventStatus.completed:
        return 'Completed';
      default:
        return status;
    }
  };

  render() {
    const {
      classes,
      isLoading,
      verifyData,
      failureData,
      isVerifyBookingCodeSuccess,
      isBoardLoading,
      isFetchServiceOptionsSuccess,
      serviceOptions,
      isFetchProviderOptionsByBusinessAdminIdSuccess,
      providerOptions,
      boardData
    } = this.props;
    const {
      bookingCode,
      defaultService,
      defaultProvider,
      confirmChangeStatusDialogOpen,
      customerFlowDetailItem,
      toStatus
    } = this.state;

    let data = (
      <Card className={isBoardLoading ? `${classes.loadingEffect}` : ''}>
        {!confirmChangeStatusDialogOpen || <Dialog
          open
          onClose={this.handleConfirmChangeStatusDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Update customer flow status
          </DialogTitle>
          <DialogContent>
            Do you intent to update
            booking code {
              customerFlowDetailItem.bookingCode
            } of {
              customerFlowDetailItem.name
            } from {
              this.getDisplayStatus(customerFlowDetailItem.status)
            } to {
              this.getDisplayStatus(toStatus)
            }?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirmChangeStatusDialogClose}>
              Cancel
            </Button>
            <Button
              onClick={() => this.updateStatus(customerFlowDetailItem, toStatus)}
              color="success">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>}
         <div>
             {typeof failureData !== 'undefined' && failureData !== null ?
               (<div className="alert-danger">{failureData.message}</div>) : <div></div>}
         </div>
        <div className={classes.cardTitleMargin + " " + classes.flexItem}>
          <h4 className={classes.boardHeader}>Customer Flow Board</h4>
          {boardData && boardData.mode && <Typography variant="subtitle2" className={classes.modeMargin}>Mode: {boardData.mode}</Typography>}
          {isFetchServiceOptionsSuccess && <Select
            className={classes.cardTitleMargin}
            value={defaultService}
            onChange={e => this.onChangeProviderOrService(e, 'defaultService')}
            name="serviceId"
          >
            {serviceOptions.map(svc => (
              <MenuItem value={svc.value} key={svc.label}>
                {svc.label}
              </MenuItem>
            ))}
          </Select>}
          {isFetchProviderOptionsByBusinessAdminIdSuccess && <Select
            name="providerId"
            onChange={e => this.onChangeProviderOrService(e, 'defaultProvider')}
            value={defaultProvider}
            className={classes.cardTitleMargin}
          >
            {providerOptions.map(svc => (
              <MenuItem value={svc.value} key={svc.label}>
                {svc.label}
              </MenuItem>
            ))}
          </Select>}
        </div>
        <Paper>
          <Table aria-labelledby="serviceCategories">
            <TableHead>
              <TableRow>
                {boardData.mode && boardData.mode.toUpperCase() === boardMode.queue && <TableCell className={classes.cellHeaderBold}>Position</TableCell>}
                <TableCell className={classes.cellHeaderBold}>Slot</TableCell>
                <TableCell className={classes.cellHeaderBold}>Booking code</TableCell>
                <TableCell className={classes.cellHeaderBold}>Name</TableCell>
                <TableCell className={classes.cellHeaderBold}>Checked In</TableCell>
                <TableCell className={classes.cellHeaderBold}>Started</TableCell>
                <TableCell className={classes.cellHeaderBold}>Completed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(boardData.customerFlowDetailList || []).map((svc) => (
                <TableRow key={svc.bookingCode} classes={{ root: classes.row }}>
                  {boardData.mode.toUpperCase() === boardMode.queue && <TableCell>{svc.position}</TableCell>}
                  <TableCell>{moment.tz(svc.sslot, svc.timezoneId).format(defaultDateTimeFormat)}</TableCell>
                  <TableCell>{svc.bookingCode}</TableCell>
                  <TableCell>{svc.name}</TableCell>
                  <TableCell>{svc.scheckingTime ? moment.tz(svc.scheckingTime, svc.timezoneId).format(defaultDateTimeFormat) :
                    <FormControlLabel
                      control={<Checkbox color="primary"
                        checked={false}
                        onClick={() => this.handleConfirmChangeStatus(
                          { ...svc, providerId: boardData.providerId, serviceId: boardData.serviceId },
                          eventStatus.checkedIn
                        )}
                        disabled={!!svc.sserviceTime} />}
                    />}</TableCell>
                  <TableCell>{svc.sserviceTime ? moment.tz(svc.sserviceTime, svc.timezoneId).format(defaultDateTimeFormat) :
                    <FormControlLabel
                      control={<Checkbox color="primary"
                        checked={false}
                        onClick={() => this.handleConfirmChangeStatus(
                          { ...svc, providerId: boardData.providerId, serviceId: boardData.serviceId },
                          eventStatus.started
                        )}
                        disabled={!svc.scheckingTime || !!svc.scompletedTime} />}
                    />}</TableCell>
                  <TableCell>{svc.scompletedTime ? moment.tz(svc.scompletedTime, svc.timezoneId).format(defaultDateTimeFormat) :
                    <FormControlLabel
                      control={<Checkbox color="primary"
                        checked={false}
                        onClick={() => this.handleConfirmChangeStatus(
                          { ...svc, providerId: boardData.providerId, serviceId: boardData.serviceId },
                          eventStatus.completed
                        )}
                        disabled={!svc.sserviceTime} />}
                    />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isBoardLoading && <div className={classes.spaceLoading}>
            <CircularProgress />
          </div>}
          {!isBoardLoading &&
          (!boardData.customerFlowDetailList || boardData.customerFlowDetailList.length === 0) &&
            <div className={classes.spaceLoading}>
              <Typography variant="body1">There is no record</Typography>
            </div>
          }
        </Paper>
      </Card>
    );
    return (
      <div>
        <Card className={isLoading ? `${classes.loadingEffect}` : ''}>
          <GridContainer className={classes.gridContainerPadding}>
            {isLoading && <CircularProgress className={classes.loadingCenter} />}
            <GridItem xs={4} className={classes.gridItemPadding}>
              <h4>
                Booking code verification
              </h4>
              <div>
                <CustomInput
                  formControlProps={{
                    className: classes.top + " " + classes.search
                  }}
                  inputProps={{
                    placeholder: "Enter booking code",
                    inputProps: {
                      "aria-label": "Enter booking code",
                      className: classes.searchInput
                    }
                  }}
                  value={bookingCode}
                  onChange={this.onBookingCodeChange}
                />
                <Button
                  color="success"
                  className={classes.verifyButton}
                  disabled={!bookingCode}
                  onClick={this.verifyCode}>
                  Verify
                </Button>
              </div>
            </GridItem>
            <GridItem xs={8} className={classes.borderLeft + ' ' + classes.gridItemPadding}>
              <h4>
                Booking information
              </h4>
              <GridContainer>
                <GridItem md={6}>
                  <CustomInput
                    labelText="First name"
                    id="firstName"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={verifyData.firstName || ""}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={verifyData.email || ""}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Phone Number"
                    id="phoneNumber"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={verifyData.phoneNumber || ""}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Position"
                    id="position"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={(verifyData.position === undefined) ? "" : verifyData.position}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Slot"
                    id="slot"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={verifyData.sslot ? moment.tz(verifyData.sslot, verifyData.timezoneId).format(defaultDateTimeFormat) : ''}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Provider Name"
                    id="providerName"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={verifyData.providerName || ""}
                  />
                </GridItem>
                <GridItem md={6}>
                  <CustomInput
                    labelText="Service Name"
                    id="serviceName"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      disabled: true,
                    }}
                    value={verifyData.serviceName || ""}
                  />
                </GridItem>
                {(isVerifyBookingCodeSuccess &&
                  ([eventStatus.unspecified, eventStatus.confirmed].includes(verifyData.status.toUpperCase())))
                  ? <GridItem md={6}>
                    <Button
                      color="success"
                      className={classes.checkInButton}
                      onClick={() => this.updateStatus(verifyData, eventStatus.checkedIn, true)}>
                      Check In
                  </Button>
                  </GridItem> :
                  <GridItem md={6}>
                    <CustomInput
                      labelText="Status"
                      id="status"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        disabled: true,
                      }}
                      value={this.getDisplayStatus(verifyData.status) || ""}
                    />
                  </GridItem>}
              </GridContainer>
            </GridItem>
          </GridContainer>
        </Card>
        {data}
      </div>
    )
  }
}

CustomerService.propTypes = {
  failureData: verifyBookingCodeType.isRequired,
  verifyData: verifyBookingCodeType.isRequired,
  boardData: customerFlowBoardType.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVerifyBookingCodeSuccess: PropTypes.bool.isRequired,
  verifyBookingCode: PropTypes.func.isRequired,
  updateCustomerStatus: PropTypes.func.isRequired,

  fetchFlowBoard: PropTypes.func.isRequired,
  isBoardLoading: PropTypes.bool.isRequired,

  isFetchServiceOptionsSuccess: PropTypes.bool.isRequired,
  serviceOptions: PropTypes.arrayOf(optionType).isRequired,

  isFetchProviderOptionsByBusinessAdminIdSuccess: PropTypes.bool.isRequired,
  providerOptions: PropTypes.arrayOf(optionType).isRequired,
};

const mapStateToProps = state => ({
  failureData: state.customerService.failureData,
  verifyData: state.customerService.verifyData,
  isLoading: state.customerService.isLoading,
  isVerifyBookingCodeSuccess: state.customerService.isVerifyBookingCodeSuccess,
  boardData: state.customerService.boardData,
  isBoardLoading: state.customerService.isBoardLoading,
  isFetchServiceOptionsSuccess: state.options.service.isFetchServiceOptionsSuccess,
  serviceOptions: state.options.service.serviceOptions,
  isFetchProviderOptionsByBusinessAdminIdSuccess: state.customerService.isFetchProviderOptionsByBusinessAdminIdSuccess,
  providerOptions: state.customerService.providerOptions,
});

const mapDispatchToProps = {
  verifyBookingCode,
  updateCustomerStatus,
  fetchFlowBoard,
  fetchServiceOptionsByBusinessAdminId,
  fetchProviderOptionsByBusinessAdminId,
  fetchProvidersAndServicesByBusinessAdminId
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(
    theme => ({
      ...tableStyle(theme),
      ...listPageStyle,
      ...customerServiceStyle
    }),
    { withTheme: true }
  )(CustomerService)
);
