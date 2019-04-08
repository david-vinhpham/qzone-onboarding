import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateEmail from '../../utils/validateEmail';
import ForceChangePassword from './force-change-password';
import { userDetailType } from '../../types/global';
import Account from './account';
import Personal from './personal';
import { userStatus as eUserStatus } from '../../constants';

class Profile extends React.Component {
  static propTypes = {
    user: userDetailType.isRequired,
    updateProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      account: {
        email: this.props.user.email,
        emailState: '',
      },
    };
  }

  componentDidMount() {
    console.log(' >> componentDidMount');
    let userInfo = localStorage.getItem('user');
    if(userInfo === null) {
      window.location = '/login';
    }
    userInfo = JSON.parse(userInfo);
    let  account = {
      email: '',
      emailState: '',
    }
    account.email = userInfo.email
    this.setState({ user: userInfo });
    this.setState({ account: account});
  }

  componentWillReceiveProps(nextProps) {
    const { account: { email } } = this.state;
    const { user: { userStatus } } = nextProps;
    if (email === undefined && nextProps.user.email) {
      this.setState(prevState => ({
        openResetPasswordStatus: userStatus === eUserStatus.changePassword,
        user: nextProps.user,
        account: {
          ...prevState.account,
          email: this.props.user.email,
        },
      }));
    } else {
      this.setState({
        openResetPasswordStatus: userStatus === eUserStatus.changePassword,
      });
    }
  }
  saveProfile = () => {
    console.log('saveProfile');
  };

  resetPersonalInfo = (oldPersonalInfo) => {
    this.setState({ user: oldPersonalInfo });
  };

  resetAccount = (oldAccount) => {
    this.setState({ account: oldAccount });
  };

  handleClose = () => {
    this.setState({ openResetPasswordStatus: false });
  };

  change = (event, stateName, type) => {
    if(event === undefined || event.target === undefined) {
      console.log('undefined');
      return;
    }
    const { value } = event.target;
    switch (type) {
      case 'name':
        this.setState(prevState => ({
          personal: {
            ...prevState.personal,
            [`${stateName}State`]: value.length > 0 ? 'success' : 'error',
            [stateName]: value,
          },
        }));
        return;
      case 'email':
        this.setState(prevState => ({
          account: {
            ...prevState.account,
            [`${stateName}State`]: validateEmail(value) ? 'success' : 'error',
            [stateName]: value,
          },
        }));
        return;
      default:
        this.setState(prevState => ({ personal: { ...prevState.personal, [stateName]: value } }));
    }
  };

  render() {
    const {
      user,
      account,
      account: { email },
      openResetPasswordStatus,
      id,
    } = this.state;
    console.log('email: ' + email);
    const { resetPassword: resetPasswordAction } = this.props;
    return (
      <React.Fragment>
        {user.givenName !== undefined && (
          <Personal
            {...user}
            inputChange={this.change}
            saveProfile={this.saveProfile}
            resetPersonalInfo={this.resetPersonalInfo}
          />
        )}
        {email !== undefined && (
          <Account
            {...account}
            inputChange={this.change}
            saveProfile={this.saveProfile}
            resetAccount={this.resetAccount}
            resetPassword={resetPasswordAction}
          />
        )}
        {email !== undefined && (
          <ForceChangePassword
            openChangePassword={openResetPasswordStatus}
            closeChangePassword={this.handleClose}
            email={email}
            userId={id}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userDetails,
  isDefaultPwdChanged: state.user.isDefaultPwdChanged,
});

export default connect(mapStateToProps, {
  //updateProfile,
  //resetPassword,
})(Profile);
