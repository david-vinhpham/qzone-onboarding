import React from 'react';
import { connect } from 'react-redux';
import {
	Grid, Typography,
	ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from '@material-ui/core';
import { SettingsOutlined, AccountCircleOutlined, ExpandMore, PersonOutlined } from '@material-ui/icons';
import { managementRoutes, operationRoutes, providerRoutes, profileRouteComponent, adminRoutes } from 'routes/dashboard';
import styles from './Dashboard.module.scss';
import { eUserType } from 'constants.js';
import Item from './components/Item';

const Dashboard = ({ userDetail }) => {
	if (!userDetail) return null;

	const isProvider = userDetail.userType ? userDetail.userType === eUserType.provider : true;
	const isAdmin = userDetail.userType ? userDetail.userType === eUserType.admin : false;

	return (
		<div className={styles.wrapper}>
			{!isProvider && (
				<ExpansionPanel defaultExpanded>
					<ExpansionPanelSummary
						expandIcon={<ExpandMore />}
						aria-controls="management-content"
						id="management-header"
					>
						<SettingsOutlined className={styles.headingIcon} fontSize="large" color="disabled" />
						<Typography data-test-id="managementHeading" display="inline" variant="h6">Management</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Grid container spacing={2}>
							{managementRoutes.map(route => {
								if (isProvider && !providerRoutes.includes(route.path)) {
									return null;
								}
								if (isAdmin && !adminRoutes.includes(route.path)) {
									return null;
								}
								return (
									<Item key={route.path} routeInfo={route} />
								);
							})}
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>)}
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary
					expandIcon={<ExpandMore />}
					aria-controls="operation-content"
					id="operation-header"
				>
					<AccountCircleOutlined className={styles.headingIcon} fontSize="large" color="disabled" />
					<Typography data-test-id="customersHeading" display="inline" variant="h6">Operation</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={2}>
						{operationRoutes.map(route => {
							if (isProvider && !providerRoutes.includes(route.path)) {
								return null;
							}
							if (isAdmin && !adminRoutes.includes(route.path)) {
								return null;
							}
							return (
								<Item key={route.path} routeInfo={route} />
							);
						})}
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary
					expandIcon={<ExpandMore />}
					aria-controls="account-content"
					id="account-header"
				>
					<PersonOutlined className={styles.headingIcon} fontSize="large" color="disabled" />
					<Typography data-test-id="customersHeading" display="inline" variant="h6">Account</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container spacing={2}>
						<Item routeInfo={profileRouteComponent} />
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	)
};

const mapStateToProps = state => ({
	userDetail: state.user.userDetail,
});

export default connect(mapStateToProps)(Dashboard);
