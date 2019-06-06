import { cardTitle } from '../../material-dashboard-pro-react';
import hoverCardStyle from '../hoverCardStyle';
const listPageStyle = {
  ...hoverCardStyle,
  cardProductTitle: {
    ...cardTitle,
    marginTop: '0px',
    marginBottom: '3px',
    textAlign: 'center'
  },
  cardProductDesciprion: {
    textAlign: 'center',
    color: '#999999'
  },
  borderLeft: {
    borderLeft: '#999999 solid 1px'
  },
  gridContainerPadding: {
    padding: '10px'
  },
  cardTitleMargin: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  flexItem: {
    display: 'flex'
  },
  boardHeader: {
    flexGrow: 1
  },
  gridItemPadding: {
    paddingLeft: '20px',
    paddingRight: '20px'
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  },
  centerDiv: {
    margin: 'auto !important'
  },
  buttonMarginTop: {
    marginTop: '20px'
  },
  buttonDisplay: {
    position: 'absolute',
    right: 0,
    top: 10,
    backgroundColor: '#d81b60',
    '&:hover,&:focus': {
      backgroundColor: '#d81b60'
    }
  },
  cardPadding: {
    padding: '10px'
  },
  buttonCard: {
    marginTop: '18px'
  },
  modeMargin: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20
  }
};
export default listPageStyle;
