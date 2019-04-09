import React from 'react'
import GridContainer from '../../components/Grid/GridContainer.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import PhoneInput from 'react-phone-number-input';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/CheckCircleOutlined';
export default class Profile extends React.Component{
	render() {
		return(
			<h1>Profile</h1>
		)
	}
}
