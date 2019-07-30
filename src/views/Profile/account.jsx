import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  IconButton,
  Button,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import SaveIcon from '@material-ui/icons/CheckCircleOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
/*import Alert from 'react-s-alert';*/
import CustomInput from '../../components/CustomInput/CustomInput';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import accountPageStyles from '../../assets/jss/material-dashboard-pro-react/modules/accountPageStyles';
/*import ChangePassword from './change-password';*/
import { classesType } from '../../types/global';
/*import AlertMessage from '../../components/Alert/Message';*/

class Account extends PureComponent {
  static propTypes = {
    classes: classesType.isRequired,
    inputChange: PropTypes.func.isRequired,
    email: PropTypes.string,
    emailState: PropTypes.string.isRequired,
    saveProfile: PropTypes.func.isRequired,
    resetAccount: PropTypes.func.isRequired,
  };

  static defaultProps = {
    email: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      openChangePassword: false,
      email: props.email,
      emailState: props.emailState,
    };
  }

  onChangeEmail = (event) => {
    const { inputChange: inputChangeAction } = this.props;
    inputChangeAction(event, 'email', 'email');
  };

  changeEditMode = () => {
    this.setState({ isEditMode: true });
  };

  cancelEdit = () => {
    const { ...oldAccount } = this.state;
    const { resetAccount: resetAccountAction } = this.props;
    this.setState(
      { isEditMode: false },
      () => { resetAccountAction(oldAccount); },
    );
  };

  saveEdit = () => {
    const { saveProfile: saveProfileAction } = this.props;
    this.setState({ isEditMode: false }, saveProfileAction);
  };

  onCloseChangePassword = () => {
    this.setState({ openChangePassword: false });
  };

  onOpenChangePassword = () => {
/*    const { resetPassword: resetPasswordAction } = this.props;
    const { email } = this.state;
    resetPasswordAction({ email }, (response) => {
      if (response.status === 200 && response.data.success) {
        this.setState({ openChangePassword: true });
        Alert.success(<AlertMessage>Code is successfully send to your email</AlertMessage>);
      } else {
        Alert.error(<AlertMessage>{response.data.message}</AlertMessage>);
      }
    });*/
  };

  render() {
    const {
      classes,
      email,
      emailState,
    } = this.props;
    const { isEditMode, openChangePassword, ...oldAccount } = this.state;
    let isAccountModified = false;
    Object.keys(oldAccount).forEach((key) => {
      if (!key.includes('State')) {
        // eslint-disable-next-line react/destructuring-assignment
        if (oldAccount[key] !== this.props[key]) {
          isAccountModified = true;
        }
      }
    });
    const editEmailIcon = !isEditMode
      ? <IconButton disabled={!isEditMode} aria-label="Edit" onClick={this.changeEditMode}><EditIcon /></IconButton>
      : null;
    return (
      <ExpansionPanel expanded>
        <ExpansionPanelSummary classes={{ content: classes.summary }}>
          <h4>Account</h4>
          <div>
            <Button onClick={this.onOpenChangePassword}>Change password</Button>
            {editEmailIcon}
            {isEditMode
              && (
                <IconButton
                  aria-label="Cancel"
                  color="secondary"
                  onClick={this.cancelEdit}
                >
                  <CancelIcon />
                </IconButton>
              )
            }
            {isEditMode
              && (
                <IconButton
                  aria-label="Save"
                  color="primary"
                  onClick={this.saveEdit}
                  disabled={emailState === 'error' || !isAccountModified}
                >
                  <SaveIcon />
                </IconButton>
              )
            }
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GridContainer>
            <GridItem md={12}>
              <CustomInput
                labelText="Email (required)"
                success={emailState === 'success' && isEditMode}
                error={emailState === 'error' && isEditMode}
                id="email"
                formControlProps={{ fullWidth: true, disabled: !isEditMode }}
                inputProps={{
                  onChange: this.onChangeEmail,
                  type: 'email',
                }}
                value={email}
              />
            </GridItem>
          </GridContainer>
        {/*  <ChangePassword
            openChangePassword={openChangePassword}
            closeChangePassword={this.onCloseChangePassword}
            email={email}
          />*/}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(accountPageStyles)(Account);
