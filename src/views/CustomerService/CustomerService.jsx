import React, { PureComponent } from 'react';
import classnames from 'classnames';
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
  fetchProvidersAndServicesByBusinessAdminId,
  updateGuestInfo,
  setProviderOptionsSuccess
} from "../../actions/customerService";
import { fetchServiceOptionsByBusinessAdminId } from "../../actions/serviceOptions";
import PropTypes from "prop-types";
import CustomInput from "../../components/CustomInput/CustomInput";
import { defaultDateTimeFormat, eventStatus, boardMode, eUserType } from "constants.js";
import moment from "moment-timezone";
import { verifyBookingCodeType, customerFlowBoardType, optionType, userDetailType } from "types/global";
import customerServiceStyle from 'assets/jss/material-dashboard-pro-react/views/customerService';
import BookingInformation from './BookingInformation';

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
    const { userDetail } = this.props;
    if (userDetail.userType === eUserType.provider) {
      this.props.fetchServiceOptionsByBusinessAdminId(userDetail.providerInformation.businessId);
      this.props.setProviderOptionsSuccess([{ label: userDetail.fullName, value: userDetail.id }]);
    } else {
      this.props.fetchProvidersAndServicesByBusinessAdminId(userDetail.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.defaultService === ''
      && this.props.serviceOptions.length > 0
      && prevState.defaultProvider === ''
      && this.props.providerOptions.length > 0) {
      this.setState({
        defaultService: this.props.serviceOptions[0].value,
        defaultProvider: this.props.providerOptions[0].value
      });
      this.getFlowBoardData({
        providerId: this.props.providerOptions[0].value,
        serviceId: this.props.serviceOptions[0].value
      });
    }
  }

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
    const { userDetail } = this.props;
    this.props.verifyBookingCode(
      this.state.bookingCode,
      userDetail.id,
      userDetail.userType === eUserType.provider
    );
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

  editGuestInfo = payload => () => {
    const { updateGuestInfo, verifyData, userDetail } = this.props;
    updateGuestInfo(payload, verifyData.bookingCode, userDetail.id);
  }

  render() {
    const {
      classes,
      isLoading,
      verifyData,
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
      <Card className={classnames({ [classes.loadingEffect]: isBoardLoading })}>
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
        <div className={classnames(classes.cardTitleMargin, classes.flexItem)}>
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
                {boardData.mode && boardData.mode.toUpperCase() === boardMode.queue &&
                  <TableCell className={classes.cellHeaderBold}>Position</TableCell>}
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
        <Card className={classnames({ [classes.loadingEffect]: isLoading })}>
          <GridContainer className={classes.gridContainerPadding}>
            {isLoading && <CircularProgress className={classes.loadingCenter} />}
            <GridItem xs={4} className={classes.gridItemPadding}>
              <h4>
                Booking code verification
              </h4>
              <div>
                <CustomInput
                  formControlProps={{
                    className: classnames(classes.top, classes.search)
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
            <BookingInformation
              classes={classes}
              verifyData={verifyData}
              isVerifyBookingCodeSuccess={isVerifyBookingCodeSuccess}
              updateStatus={this.updateStatus}
              getDisplayStatus={this.getDisplayStatus}
              editGuestInfo={this.editGuestInfo}
            />
          </GridContainer>
        </Card>
        {data}
      </div>
    )
  }
}

CustomerService.propTypes = {
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
  updateGuestInfo: PropTypes.func.isRequired,
  userDetail: userDetailType.isRequired,
  setProviderOptionsSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  verifyData: state.customerService.verifyData,
  isLoading: state.customerService.isLoading,
  isVerifyBookingCodeSuccess: state.customerService.isVerifyBookingCodeSuccess,
  boardData: state.customerService.boardData,
  isBoardLoading: state.customerService.isBoardLoading,
  isFetchServiceOptionsSuccess: state.options.service.isFetchServiceOptionsSuccess,
  serviceOptions: state.options.service.serviceOptions,
  isFetchProviderOptionsByBusinessAdminIdSuccess: state.customerService.isFetchProviderOptionsByBusinessAdminIdSuccess,
  providerOptions: state.customerService.providerOptions,
  userDetail: state.user.userDetail
});

const mapDispatchToProps = {
  verifyBookingCode,
  updateCustomerStatus,
  fetchFlowBoard,
  fetchServiceOptionsByBusinessAdminId,
  fetchProviderOptionsByBusinessAdminId,
  fetchProvidersAndServicesByBusinessAdminId,
  updateGuestInfo,
  setProviderOptionsSuccess
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
