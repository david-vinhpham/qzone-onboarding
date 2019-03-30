import React from 'react';
import { bool } from 'prop-types';
import { Typography } from '@material-ui/core';
import { Assignment } from '@material-ui/icons';

import styles from './CalendarLoading.module.scss';

export default function CalendarLoading({ isLoading }) {
  return isLoading ? (
    <div className={styles.loadingWrapper}>
      <Assignment className={styles.loadingIcon} />
      <Typography variant="h5">Getting your calendar</Typography>
    </div>
  ) : null;
}

CalendarLoading.propTypes = {
  isLoading: bool
};

CalendarLoading.defaultProps = {
  isLoading: false
};
