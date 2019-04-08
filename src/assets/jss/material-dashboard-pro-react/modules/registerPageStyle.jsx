// ##############################
// // // RegisterPage view styles
// #############################

import {
  container,
  cardTitle,
} from 'assets/jss/material-dashboard-pro-react';
import customCheckboxRadioSwitch from 'assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch';
import {
  altoColor, darkGrayColor, whiteRgb, roseColor, pacificBlueColor,
} from 'assets/jss/color-theme';

const registerPageStyle = {
  ...customCheckboxRadioSwitch,
  standardCardTitle: {
    ...cardTitle,
    color: whiteRgb,
    fontWeight: 'bold',
  },
  cardTitle: {
    ...cardTitle,
    textAlign: 'center',
  },
  container: {
    ...container,
    position: 'relative',
    zIndex: '3',
    paddingTop: '0vh',
    maxWidth: '600px',
  },
  registerHeader: {
    color: 'white',
    margin: '0 auto',
    width: '100%',
    padding: '1em',
    textAlign: 'center',
    background: `linear-gradient(to bottom, ${roseColor}, ${pacificBlueColor})`,
  },
  content: {
    minHeight: '100vh',
    position: 'relative',
    zIndex: '4',
  },
  cardHidden: {
    opacity: '0',
    transform: 'translate3d(0, -60px, 0)',
  },
  cardSignup: {
    borderRadius: '6px',
    boxShadow:
      `0 16px 24px 2px rgba(${whiteRgb}, 0.14), 0 6px 30px 5px rgba(${whiteRgb}, 0.12), 0 8px 10px -5px rgba(${whiteRgb}, 0.2)`,
    marginBottom: '100px',
    padding: '40px 0px',
    marginTop: '15vh',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  left: {
    textAlign: 'left',
  },
  socialTitle: {
    fontSize: '18px',
  },
  inputAdornment: {
    marginRight: '18px',
    position: 'relative',
  },
  inputAdornmentIcon: {
    color: darkGrayColor,
  },
  customFormControlClasses: {
    margin: '0 12px',
  },
  checkboxLabelControl: {
    margin: '0',
  },
  checkboxLabel: {
    marginLeft: '6px',
    color: `rgba(${whiteRgb}, 0.26)`,
  },
  linkDisplay: {
    position: 'absolute',
    right: 0,
    top: 10,
    // backgroundColor: "#303f9f",
    '&:hover,&:focus': {
      // backgroundColor: "#303f9f"
    },
  },
  inputWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    '&> div[class*="CustomInput-formControl"]': {
      flex: '1 1 auto',
    },
    '&> div[class*="CustomInput-formControl"]:first-child': {
      marginRight: 32,
    },
  },
  footerWrapper: {
    borderTop: `1px solid ${altoColor}`,
  },
  loginButton: {
    padding: '12px 30px',
  },
  registerTermsWrapper: {
    marginBottom: 0,
    marginTop: 0,
  },
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    background: `linear-gradient(to bottom, ${roseColor}, ${pacificBlueColor})`,
    alignItems: 'center',
    borderBottom: `1px solid ${altoColor}`,
  },
  hiddenInput: {
    visibility: 'hidden',
  },
};

export default registerPageStyle;
