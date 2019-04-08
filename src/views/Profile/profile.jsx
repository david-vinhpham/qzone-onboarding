import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validateEmail from '../../utils/validateEmail';
//import { updateProfile } from 'services/api/profile';
//import { resetPassword } from 'services/api/user';
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
      id: '',
      personal: {
        firstname: '',
        lastname: '',
        postCode: '',
      },
      account: {
        email: '',
        emailState: '',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps');
  }
  componentDidMount() {
   // const { user: { userStatus } } = this.props;
  //  this.setState({
  //    openResetPasswordStatus: userStatus === eUserStatus.changePassword,
  //  });
  }
/*
  componentWillReceiveProps(nextProps) {
    const { account: { email } } = this.state;
    const { user: { userStatus } } = nextProps;
    if (email === undefined && nextProps.user.email) {
      this.setState(prevState => ({
        openResetPasswordStatus: userStatus === eUserStatus.changePassword,
        id: nextProps.user.id,
        personal: {
          ...prevState.personal,
          firstname: nextProps.user.firstname,
          lastname: nextProps.user.lastname,
          companyName: nextProps.user.companyName,
          department: nextProps.user.department,
          phoneNumber: nextProps.user.phoneNumber,
          postCode: nextProps.user.postCode,
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
*/
  change = (event, stateName, type) => {
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

  saveProfile = () => {
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

  render() {
    const {
      personal,
      account,
      account: { email },
      openResetPasswordStatus,
      id,
    } = this.state;
    const { resetPassword: resetPasswordAction } = this.props;
    return (
      <React.Fragment>
        {personal.firstname !== undefined && (
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
  user: state.user.userDetail,
  isDefaultPwdChanged: state.user.isDefaultPwdChanged,
});

export default connect(mapStateToProps, {
  //updateProfile,
  //resetPassword,
})(Profile);
