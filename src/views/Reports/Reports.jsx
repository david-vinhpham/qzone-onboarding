import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';
import { fetchProviderOptionsByBusinessAdminId } from 'actions/providerOptions';
import { fetchServiceOptionsByBusinessAdminId } from 'actions/serviceOptions';
import {
	Select, MenuItem, Button, Typography,
	Card, CardContent, CardActions, Grid,
	RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import { getCustomerReports } from 'actions/reports';
import moment from 'moment-timezone';
import styles from './Reports.module.scss';
import { eventStatus } from 'constants.js';
import ReportDialog from 'components/ReportDialog/ReportDialog';

const localTimezone = moment.tz.guess();

const mapCustomerStatus = {
	[eventStatus.checkedIn]: 'waiting',
	[eventStatus.started]: 'in service',
	[eventStatus.completed]: 'completed'
};

const onChangeDateTime = (setDateTime) => (value) => {
	setDateTime(value.toDate());
}

const onChange = (setState) => (event) => {
	const value = event.target.value;
	setState(value);
}

const exportReport = (exportAction, payload, setReportDialogStatus) => () => {
	setReportDialogStatus(true);
	exportAction({
		...payload,
		startTime: moment(payload.startTime).unix(),
		endTime: moment(payload.endTime).unix(),
	});
}

const closeReportDialog = (setStatus) => () => {
	setStatus(false);
}

const Reports = ({
	userDetail,
	serviceOptions,
	providerOptions,
	fetchProviderOptions,
	fetchServiceOptions,
	isFetchProviderOptionsSuccess,
	isFetchServiceOptionsSuccess,
	fetchCustomerReports,
	reportInfo,
	isReportLoading
}) => {
	const [startTime, setStartTime] = useState(new Date());
	const [endTime, setEndTime] = useState(new Date());
	const [serviceId, setServiceId] = useState('');
	const [providerId, setProviderId] = useState('');
	const [customerStatus, setCustomerStatus] = useState(eventStatus.checkedIn);
	const [isOpenReportDialog, setReportDialogStatus] = useState(false);

	useEffect(() => {
		if (userDetail && userDetail.id) {
			fetchProviderOptions(userDetail.id);
			fetchServiceOptions(userDetail.id);
		}
	}, [fetchProviderOptions, fetchServiceOptions, userDetail, userDetail.id]);

	useEffect(() => {
		if (isFetchProviderOptionsSuccess && !providerId) {
			setProviderId(providerOptions[0].value);
		}
	}, [isFetchProviderOptionsSuccess, providerId, providerOptions]);

	useEffect(() => {
		if (isFetchServiceOptionsSuccess && !serviceId) {
			setServiceId(serviceOptions[0].value);
		}
	}, [isFetchServiceOptionsSuccess, serviceId, serviceOptions]);

	const data = reportInfo.data[customerStatus];
	const reportData = {
		...reportInfo,
		data,
		filename: `Quezone customer ${
			mapCustomerStatus[customerStatus]
			} report for ${
			reportInfo.data.providerName
			} - ${
			reportInfo.data.serviceName
			}.csv`,
	};

	return (
		<Card className={styles.wrapper}>
			{isOpenReportDialog && (
				<ReportDialog
					onDialogClose={closeReportDialog(setReportDialogStatus)}
					reportData={reportData}
					isReportLoading={isReportLoading}
				/>
			)}
			<CardContent className={styles.content}>
				<Grid container>
					<Grid item xs={6}>
						<Typography variant="body1">Timezone: {localTimezone}</Typography>
						<Grid container alignItems="center" className={styles.reportField}>
							<Typography className={styles.reportFieldLabel} display="inline">Start date:</Typography>
							<DateTimePicker
								value={startTime}
								onChange={onChangeDateTime(setStartTime)}
							/>
						</Grid>
						<Grid container alignItems="center" className={styles.reportField}>
							<Typography className={styles.reportFieldLabel} display="inline">End date:</Typography>
							<DateTimePicker
								value={endTime}
								onChange={onChangeDateTime(setEndTime)}
							/>
						</Grid>
						{isFetchServiceOptionsSuccess && <Grid container alignItems="center" className={styles.reportField}>
							<Typography className={styles.reportFieldLabel} display="inline">Service:</Typography>
							<Select
								value={serviceId}
								onChange={onChange(setServiceId)}
								name="serviceId"
							>
								{serviceOptions.map(svc => (
									<MenuItem value={svc.value} key={svc.label}>
										{svc.label}
									</MenuItem>
								))}
							</Select>
						</Grid>}
						{isFetchProviderOptionsSuccess && <Grid container alignItems="center" className={styles.reportField}>
							<Typography className={styles.reportFieldLabel} display="inline">Provider:</Typography>
							<Select
								value={providerId}
								onChange={onChange(setProviderId)}
								name="providerId"
							>
								{providerOptions.map(pvd => (
									<MenuItem value={pvd.value} key={pvd.label}>
										{pvd.label}
									</MenuItem>
								))}
							</Select>
						</Grid>}
					</Grid>
					<Grid item xs={6}>
						<Typography>Including customers:</Typography>
						<RadioGroup
							aria-label="customer-status"
							name="customer-status"
							value={customerStatus}
							onChange={onChange(setCustomerStatus)}
						>
							<FormControlLabel
								value={eventStatus.checkedIn}
								control={<Radio color="primary" />}
								label="Waiting"
							/>
							<FormControlLabel
								value={eventStatus.started}
								control={<Radio color="primary" />}
								label="In service"
							/>
							<FormControlLabel
								value={eventStatus.completed}
								control={<Radio color="primary" />}
								label="Completed"
							/>
						</RadioGroup>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions className={styles.footer}>
				<Button
					color="primary"
					variant="outlined"
					onClick={exportReport(
						fetchCustomerReports,
						{ serviceId, providerId, startTime, endTime },
						setReportDialogStatus
					)}
				>
					Export
				</Button>
			</CardActions>
		</Card>
	)
}

const mapStateToProps = (state) => ({
	serviceOptions: state.options.service.serviceOptions,
	isFetchServiceOptionsSuccess: state.options.service.isFetchServiceOptionsSuccess,
	providerOptions: state.options.provider.providerOptions,
	isFetchProviderOptionsSuccess: state.options.provider.isFetchProviderOptionsSuccess,
	userDetail: state.user.userDetail,
	reportInfo: state.reports.info,
	isReportLoading: state.reports.isLoading,
});

const mapDispatchToProps = {
	fetchProviderOptions: fetchProviderOptionsByBusinessAdminId,
	fetchServiceOptions: fetchServiceOptionsByBusinessAdminId,
	fetchCustomerReports: getCustomerReports
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
