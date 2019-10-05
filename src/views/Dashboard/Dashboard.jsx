import React from 'react';
import { connect } from 'react-redux';
import {
	Grid, Card, CardContent, Typography,
	ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary
} from '@material-ui/core';
import { SettingsOutlined, AccountCircleOutlined, ExpandMore, PersonOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { managementRoutes, operationRoutes, providerRoutes, profileRouteComponent } from 'routes/dashboard';
import styles from './Dashboard.module.scss';
import { eUserType } from 'constants.js';

const Dashboard = ({ userDetail }) => {
	if (!userDetail) return null;

	const isProvider = userDetail.userType ? userDetail.userType === eUserType.provider : true;
	const ProfileIcon = profileRouteComponent.icon;

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
								const RouteIcon = route.icon;
								return (
									<Grid data-test-id={`dashboard-${route.dataTestId}`} key={route.path} className={styles.route} item xs={4} lg={2}>
										<Link to={route.path}>
											<Card className={styles.routeContent}>
												<CardContent>
													<RouteIcon fontSize="large" color={route.iconColor} />
													<Typography>{route.name}</Typography>
												</CardContent>
											</Card>
										</Link>
									</Grid>
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
							const RouteIcon = route.icon;
							return (
								<Grid data-test-id={`dashboard-${route.dataTestId}`} key={route.path} className={styles.route} item xs={4} lg={2}>
									<Link to={route.path}>
										<Card className={styles.routeContent}>
											<CardContent>
												<RouteIcon fontSize="large" color={route.iconColor} />
												<Typography>{route.name}</Typography>
											</CardContent>
										</Card>
									</Link>
								</Grid>
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
						<Grid data-test-id={`dashboard-${profileRouteComponent.dataTestId}`} className={styles.route} item xs={4} lg={2}>
							<Link to={profileRouteComponent.path}>
								<Card className={styles.routeContent}>
									<CardContent>
										<ProfileIcon fontSize="large" color={profileRouteComponent.iconColor} />
										<Typography>{profileRouteComponent.name}</Typography>
									</CardContent>
								</Card>
							</Link>
						</Grid>
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
