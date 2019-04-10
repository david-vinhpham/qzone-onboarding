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
      id: props.user.id,
      personal: {
        givenName: props.user.givenName,
        familyName: props.user.familyName,
        userType: props.user.userType,
        telephone: props.user.telephone,
        userStatus: props.user.userStatus,
        streetAddress: props.user.address ===null || props.user.address === undefined ? ''
          : props.user.address.streetAddress === null ? '' : props.user.address.streetAddress,
        city: props.user.address ===null || props.user.address === undefined ? ''
          : props.user.address.city === null ? '' : props.user.address.city,
        state: props.user.address ===null || props.user.address === undefined ? ''
          : props.user.address.state === null ? '' : props.user.address.state,
        postCode: props.user.address ===null || props.user.address === undefined ? ''
          : props.user.address.postCode === null ? '' : props.user.address.postCode,
        country: props.user.address ===null || props.user.address === undefined ? ''
          : props.user.address.country === null ? '' : props.user.address.country,
        userSub: props.user.userSub,
        givenNameState: '',
        familyNameState: '',
      },
      account: {
        email: props.user.email,
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
    this.setState({ id: userInfo.id });
    this.setState({ personal: userInfo });
    this.setState({ account: account});
  }

  componentWillReceiveProps(nextProps) {
    const { account: { email } } = this.state;
    const { user: { userStatus } } = nextProps;
    if (email === undefined && nextProps.user.email) {
      this.setState(prevState => ({
        openResetPasswordStatus: userStatus === eUserStatus.changePassword,
        id: nextProps.user.id,
        personal: {
          ...prevState.personal,
          givenName: nextProps.user.givenName,
          familyName: nextProps.user.familyName,
          userType: nextProps.user.userType,
          telephone: nextProps.user.telephone,
          userStatus: nextProps.user.userStatus,
          streetAddress: nextProps.user.address ===null || nextProps.user.address === undefined ? ''
            : nextProps.user.address.streetAddress === null ? '' : nextProps.user.address.streetAddress,
          city: nextProps.user.address ===null || nextProps.user.address === undefined ? ''
            : nextProps.user.address.city === null ? '' : nextProps.user.address.city,
          state: nextProps.user.address ===null || nextProps.user.address === undefined ? ''
            : nextProps.user.address.state === null ? '' : nextProps.user.address.state,
          postCode: nextProps.user.address ===null || nextProps.user.address === undefined ? ''
            : nextProps.user.address.postCode === null ? '' : nextProps.user.address.postCode,
          country: nextProps.user.address ===null || nextProps.user.address === undefined ? ''
            : nextProps.user.address.country === null ? '' : nextProps.user.address.country,
          userSub: nextProps.user.userSub,
        },
        account: {
          ...prevState.account,
          email: nextProps.user.email,
        },
      }));
    } else {
      this.setState({
        openResetPasswordStatus: userStatus === eUserStatus.changePassword,
      });
    }
  }
  saveProfile = () => {
    console.log('saveProfile...');
    const {
      id,
      account: { ...accountInfo },
      personal: { ...personalInfo },
    } = this.state;
    const { updateProfile: updateProfileAction } = this.props;
    updateProfileAction({ id, ...accountInfo, ...personalInfo });
  };

  resetPersonalInfo = (oldPersonalInfo) => {
    this.setState({ personal: oldPersonalInfo });
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
      personal,
      account,
      account: { email },
      openResetPasswordStatus,
      id,
    } = this.state;
    console.log('email: ' + email);
    const { resetPassword: resetPasswordAction } = this.props;
    return (
      <React.Fragment>
        {personal.givenName !== undefined && (
          <Personal
            {...personal}
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
