import { cardTitle, container } from 'assets/jss/material-dashboard-pro-react';
import buttonStyle from 'assets/jss/material-dashboard-pro-react/components/buttonStyle';
import { roseColor, blackRgb } from 'assets/jss/color-theme';

const listPageStyle = {
  // for checkbox
  deleteAllChecked: {
    color: `${roseColor} !important`,
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px',
  },
  buttonDisplay: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: roseColor,
    '&:hover,&:focus': {
      backgroundColor: roseColor,
    },
  },
  container: {
    ...container,
    position: 'relative',
    zIndex: '3',
    paddingTop: '5vh',
  },
  linkDisplay: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  order: {
    textAlign: 'center',
  },
  surveyLogo: {
    width: '45px',
    height: '100%',
  },
  assessTooltip: {
    background: `rgba(${blackRgb}, 1) !important`,
  },
  ...buttonStyle,
};
export default listPageStyle;
