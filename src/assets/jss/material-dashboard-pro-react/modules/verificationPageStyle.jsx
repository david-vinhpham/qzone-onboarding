import customCheckboxRadioSwitch from 'assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch';

const verificationPageStyle = {
  ...customCheckboxRadioSwitch,
  dialogActions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    margin: 0,
  },
  resendCode: {
    marginRight: 5,
    '&:hover, &:focus': {
      textDecoration: 'underline',
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      color: '#d2d2d2',
      '&:hover, &:focus': {
        textDecoration: 'none',
      },
    },
  },
};

export default verificationPageStyle;
