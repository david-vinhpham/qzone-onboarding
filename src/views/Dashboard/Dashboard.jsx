import React from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Card, CardContent, Typography, Divider } from '@material-ui/core';
import { SettingsOutlined, AccountCircleOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { managementRoutes, dashboardRoutes, providerRoutes } from 'routes/dashboard';
import styles from './Dashboard.module.scss';
import { eUserType } from 'constants.js';

const Dashboard = ({ userDetail }) => {
	if (!userDetail) return null;

	const isProvider = userDetail.userType ? userDetail.userType === eUserType.provider : true;

	return (
		<Paper className={styles.wrapper}>
			{!isProvider &&
				<>
					<Grid container spacing={2}>
						<Grid item xs={12} className={styles.heading}>
							<Grid container alignItems="center">
								<SettingsOutlined className={styles.headingIcon} fontSize="large" color="disabled" />
								<Typography data-test-id="managementHeading" display="inline" variant="h6">Management</Typography>
							</Grid>
						</Grid>
						{managementRoutes.map(route => {
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
					<Divider light variant="middle" className={styles.divider} />
				</>
			}
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Grid container alignItems="center">
						<AccountCircleOutlined className={styles.headingIcon} fontSize="large" color="disabled" />
						<Typography data-test-id="customersHeading" display="inline" variant="h6">Customers</Typography>
					</Grid>
				</Grid>
				{dashboardRoutes.map(route => {
					if (!route.icon || route.path === '/dashboard' || (isProvider && !providerRoutes.includes(route.path))) {
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
		</Paper>
	)
};

const mapStateToProps = state => ({
	userDetail: state.user.userDetail,
});

export default connect(mapStateToProps)(Dashboard);
