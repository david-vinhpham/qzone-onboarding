// ##############################
// // // LoginPage view styles
// #############################

import {
  container,
  cardTitle,
  alertWrapper,
  alertLink,
  noMarginTop,
} from 'assets/jss/material-dashboard-pro-react';
import customCheckboxRadioSwitch from 'assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch';
import theme from 'assets/jss/material-dashboard-pro-react/layouts/theme';
import {
  dangerColor, successColor, darkGrayColor, sanMarinoColor, whiteColor, silverColor,
} from 'assets/jss/color-theme';

const loginPageStyle = {
  container,
  alertWrapper,
  alertLink,
  noMarginTop,
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
  },
  iconsBar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '2.8em auto',
    width: '70%',
    color: theme.indigoTheme.palette.primary.contrastText,
  },
  socialIcon: {
    width: 'auto',
    fontSize: '1.6rem !important',
    margin: 'auto !important',
    '&:hover': {
      color: silverColor,
      transition: `color ${silverColor} .2s`,
    },
  },
  textCenter: {
    textAlign: 'center',
  },
  justifyContentEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    margin: '0 auto',
    width: '360px',
    position: 'relative',
    zIndex: '4',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  customButtonClass: {
    '&,&:focus,&:hover': {
      color: whiteColor,
    },
    marginLeft: '5px',
    marginRight: '5px',
  },
  inputAdornment: {
    marginRight: '18px',
  },
  inputAdornmentIcon: {
    color: darkGrayColor,
  },
  inputAdornmentIconsuccess: {
    color: `${successColor} !important`,
  },
  inputAdornmentIconerror: {
    color: `${dangerColor} !important`,
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardHeader: {
    marginBottom: '20px',
  },
  socialLine: {
    padding: '0.9375rem 0',
    display: 'flex',
  },
  socialButton: {
    flex: '1 1 auto',
    borderRadius: 5,
    '&:hover': {
      opacity: 0.7,
    },
  },
  fbButton: {
    backgroundColor: sanMarinoColor,
    marginRight: 10,
    marginLeft: 10,
    '&:focus, &:hover': {
      backgroundColor: sanMarinoColor,
    },
  },
  googleButton: {
    backgroundColor: '#d93025',
    '&:focus, &:hover': {
      backgroundColor: '#d93025',
    },
  },
  twitterButton: {
    backgroundColor: '#1da1f2',
    '&:focus, &:hover': {
      backgroundColor: '#1da1f2',
    },
  },
  breakLine: {
    textAlign: 'center',
    position: 'relative',
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      width: '45%',
      height: 1,
      backgroundColor: '#d2d2d2',
      top: 0,
      bottom: 0,
      margin: 'auto',
    },
    '&::before': {
      left: 0,
    },
    '&::after': {
      right: 0,
    },
  },
  submitWrapper: {
    display: 'block',
    paddingTop: '0.9375rem',
    justifyContent: 'space-between',
  },
  footerWrapper: {
    justifyContent: 'center',
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerPanel: {
    width: '100vw',
    height: '28vh',
    borderRadius: 8,
    marginTop: '-2.2em',
    background: theme.indigoTheme.palette.primary.main,
    boxShadow: `2px 3px 3px ${silverColor}`,
  },
  inputIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    color: theme.indigoTheme.palette.primary.dark,
  },
  inputIconError: {
    color: dangerColor,
  },
  loginPanel: {
    margin: '2em auto',
  },
  contrastText: {
    color: theme.indigoTheme.palette.primary.contrastText,
  },
  loginButtonLabel: {
    fontSize: 'medium',
  },
};

export default loginPageStyle;
