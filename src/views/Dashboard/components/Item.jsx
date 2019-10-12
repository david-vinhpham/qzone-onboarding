import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './Item.module.scss';

const Item = ({ routeInfo, }) => {
  const RouteIcon = routeInfo.icon;
  return (
    <Grid data-test-id={`dashboard-${routeInfo.dataTestId}`} className={styles.route} item xs={4} lg={2}>
      <Link to={routeInfo.path}>
        <Paper className={styles.routeContent}>
          <RouteIcon fontSize="large" color={routeInfo.iconColor} />
          <Typography>{routeInfo.name}</Typography>
        </Paper>
      </Link>
    </Grid>
  )
}

export default Item;
