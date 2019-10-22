import React from 'react';
import { connect } from 'react-redux';
import validateEmail from '../../utils/validateEmail';
import ForceChangePassword from './force-change-password';
import Account from './account';
import Personal from './personal';
import { userStatus as eUserStatus } from '../../constants';
import { editProfile, fetchUser } from "../../actions/auth";
import {BeatLoader} from "react-spinners";
import {css} from "@emotion/core";
const override = css`
    margin: 0 auto;
    border-color: red;
    width: 100%;
    display: flex;
    justify-content: center;
`;
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.user.id,
      personal: {
        address: props.user.address,
        orgLink: props.user.orgLink,
        givenName: props.user.givenName,
        familyName: props.user.familyName,
        userType: props.user.userType,
        telephone: props.user.telephone,
        userStatus: props.user.userStatus,
        streetAddress: props.user.address === null || props.user.address === undefined ? ''
          : props.user.address.streetAddress === null ? '' : props.user.address.streetAddress,
        city: props.user.address === null || props.user.address === undefined ? ''
          : props.user.address.city === null ? '' : props.user.address.city,
        state: props.user.address === null || props.user.address === undefined ? ''
          : props.user.address.state === null ? '' : props.user.address.state,
        postCode: props.user.address === null || props.user.address === undefined ? ''
          : props.user.address.postCode === null ? '' : props.user.address.postCode,
        country: props.user.address === null || props.user.address === undefined ? ''
          : props.user.address.country === null ? '' : props.user.address.country,
        userSub: props.user.userSub,
        email: props.user.email,
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
    this.setState({ id: localStorage.getItem('userSub') });
    this.setState({
      account: {
        email: '',
        emailState: '',
      }
    });
  }

  saveProfile = () => {
    const {
      id,
      account: { ...accountInfo },
      personal: { ...personalInfo },
    } = this.state;

    let address = personalInfo.address;
    address.streetAddress = personalInfo.streetAddress;
    address.city = personalInfo.city;
    address.state = personalInfo.state;
    address.postCode = personalInfo.postCode;
    address.country = personalInfo.country;
    personalInfo.address = address;
    const { editProfile: updateProfileAction } = this.props;
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
    if (event === undefined || event.target === undefined) {
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
      id,
    } = this.state;
    const { resetPassword: resetPasswordAction, editUser, history, fetchUserLoading } = this.props;
    if (fetchUserLoading) {
      return < BeatLoader
        className={override}
        sizeUnit={"px"}
        size={100}
        color={'#123abc'}
        loading={fetchUserLoading}
      />;
    }
    return (
      <React.Fragment>
        <label> {editUser.id !== undefined && editUser.id !== null ? "Update user successfully" : ''} </label>
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
            openChangePassword={this.props.user.userStatus === eUserStatus.changePassword}
            closeChangePassword={this.handleClose}
            email={email}
            userId={id}
            history={history}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userDetail,
  editUser: state.user.editUser,
  fetchUserLoading:state.user.fetchUserLoading,
  isDefaultPwdChanged: state.user.isDefaultPwdChanged,
});

export default connect(mapStateToProps, {
  editProfile,
  fetchUser,
})(Profile);
