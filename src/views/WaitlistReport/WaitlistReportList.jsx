import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Grid,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Card from 'components/Card/Card';
import CustomButton from 'components/CustomButtons/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import headerLinksStyle from 'assets/jss/material-dashboard-pro-react/components/headerLinksStyle';
import tableStyle from 'assets/jss/material-dashboard-pro-react/components/tableStyle';
import { fetchWaitlistReport } from 'actions/waitlistReport';
import { historyType, classesType } from 'types/global';
import { BeatLoader } from "react-spinners";
import { css } from "@emotion/core";
import ReportDialog from "../../components/ReportDialog/ReportDialog";
import {
  getWaitlistReport,
  setWaitlistReportData,
} from "../../actions/tmpServices";

const override = css`
  margin: 0 auto;
  border-color: red;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
class WaitlistReportList extends PureComponent {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchWaitlistReport({
      tmpServiceId: id,
    });
    if (id !== undefined && id !== '') {
      this.setState({ tmpServiceId: id });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isOpenReport: false,
      tempServiceId: ''
    };
  }
  openReportDialog = () => {
    const {
      tmpServiceId,
    } = this.state;
    this.props.getWaitlistReport(tmpServiceId);
    this.setState({ isOpenReport: true });
  }
  closeReportDialog = () => {
    this.props.setWaitlistReportData({ providerName: '', tmServiceReportList: [] });
    this.setState({ isOpenReport: false });
  }

  render() {
    const { classes, providerName, dateEvent, reportList,
      reportData, isReportLoading, isLoading, timezone } = this.props;
    const {
      isOpenReport,
    } = this.state;
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
    return (
      <>
        {isOpenReport && (
          <ReportDialog
            onDialogClose={this.closeReportDialog}
            reportData={reportData}
            isReportLoading={isReportLoading}
          />
        )}
        <Card style={{ padding: 8 }}>
          <div style={{ flexGrow: 1, display: 'flex', marginBottom: 16 }}>
            <Button size="small" color="primary" onClick={this.props.history.goBack}>
              <ArrowBack />
            </Button>
            <Typography display="inline" variant="h6">Report review</Typography>
          </div>
          {providerName &&
            <Grid container spacing={2}>
              <Grid item md={2} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Provider name:
                </Typography>
              </Grid>
              <Grid item md={10} xs={12}>
                <Typography display="inline" variant="body2">
                  {providerName}
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Date event:
                </Typography>
              </Grid>
              <Grid item md={10} xs={12}>
                <Typography variant="body2">
                  {dateEvent}
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <Typography variant="body2" align="right" className={classes.customTitle}>
                  Timezone:
                </Typography>
              </Grid>
              <Grid item md={10} xs={12}>
                <Typography variant="body2">
                  {timezone}
                </Typography>
              </Grid>
              <Grid item md={2} xs={12}></Grid>
              <Grid item md={10} xs={12}>
                <CustomButton color="rose" onClick={this.openReportDialog}>
                  Export
                </CustomButton>
              </Grid>
            </Grid>}
        </Card>
        <Paper>
          <Table aria-labelledby="waitlistReportTable">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellHeaderBold} size="small">No</TableCell>
                <TableCell className={classes.cellHeaderBold}>Customer Name</TableCell>
                <TableCell className={classes.cellHeaderBold}>Customer Email</TableCell>
                <TableCell className={classes.cellHeaderBold}>Customer Phone</TableCell>
                <TableCell className={classes.cellHeaderBold}>Booking Code</TableCell>
                <TableCell className={classes.cellHeaderBold}>Start time</TableCell>
                <TableCell className={classes.cellHeaderBold}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportList.map((report, idx) => (
                <TableRow key={report.bookingCode} classes={{ root: classes.row }}>
                  <TableCell size="small">{idx + 1}</TableCell>
                  <TableCell>{report.customerName}</TableCell>
                  <TableCell>{report.customerEmail}</TableCell>
                  <TableCell>{report.customerPhone}</TableCell>
                  <TableCell>{report.bookingCode}</TableCell>
                  <TableCell>{report.startTime}</TableCell>
                  <TableCell>{report.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    )
  }
}

WaitlistReportList.propTypes = {
  history: historyType.isRequired,
  fetchWaitlistReport: PropTypes.func.isRequired,
  getWaitlistReport: PropTypes.func.isRequired,
  setWaitlistReportData: PropTypes.func.isRequired,
  isReportLoading: PropTypes.bool.isRequired,
  classes: classesType.isRequired,
}


const mapStateToProps = (state) => {
  return {
    reportList: state.waitlistReports.list,
    providerName: state.waitlistReports.providerName,
    dateEvent: state.waitlistReports.dateEvent,
    timezone: state.waitlistReports.timezone,
    isLoading: state.waitlistReports.isLoading,
    reportData: state.tmpServices.reportData,
    isReportLoading: state.tmpServices.isReportLoading,
  }
}

export default connect(
  mapStateToProps,
  { fetchWaitlistReport, getWaitlistReport, setWaitlistReportData }
)(withStyles(tableStyle, headerLinksStyle)(WaitlistReportList));
