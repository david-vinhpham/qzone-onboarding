import personalPageStyles from 'assets/jss/material-dashboard-pro-react/modules/personalPageStyles';

const profileStyle = {
  phoneNumber: {
    ...personalPageStyles.phoneNumber,
    '& > div > div > div:nth-child(3)': {
      visibility: 'hidden',
    },
    '& > div > input': {
      border: 'none',
    },
  },
};

export default profileStyle;
