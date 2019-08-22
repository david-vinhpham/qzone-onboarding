import { cardTitle } from '../../material-dashboard-pro-react';
import hoverCardStyle from '../hoverCardStyle';
const listPageStyle = {
  ...hoverCardStyle,
  cardTitle,
  cardProductTitle: {
    ...cardTitle,
    color: 'black',
    marginTop: '0px',
    marginBottom: '3px',
    textAlign: 'center'
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: '15px',
    marginBottom: '0px'
  },
  centerDiv: {
    margin: 'auto !important'
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
};
export default listPageStyle;
