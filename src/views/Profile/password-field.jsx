import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomInput from 'components/CustomInput/CustomInput';
import registerPageStyle from 'assets/jss/material-dashboard-pro-react/modules/registerPageStyle';
import { classesType } from 'types/global';

class PasswordField extends PureComponent {
  static propTypes = {
    onChangeDefaultPwd: PropTypes.func,
    onChangePassword: PropTypes.func.isRequired,
    onChangeConfirmPwd: PropTypes.func.isRequired,
    defaultPwdState: PropTypes.string,
    passwordState: PropTypes.string.isRequired,
    confirmPwdState: PropTypes.string.isRequired,
    classes: classesType.isRequired,
    useLabel: PropTypes.bool,
    disabledFields: PropTypes.bool,
  };

  static defaultProps = {
    useLabel: true,
    onChangeDefaultPwd: null,
    defaultPwdState: 'null',
    disabledFields: false,
  };

  render() {
    const {
      onChangeDefaultPwd,
      onChangePassword,
      onChangeConfirmPwd,
      defaultPwdState,
      passwordState,
      confirmPwdState,
      classes,
      useLabel,
      disabledFields,
    } = this.props;

    const defaultPwdProps = {
      labelText: useLabel ? 'Default Password (required)' : undefined,
      inputProps: {
        onChange: {onChangeDefaultPwd},
        type: 'password',
        placeholder: !useLabel ? 'Default Password (required)' : undefined,
        autoFocus: true,
      },
    };

    const passwordProps = {
      labelText: useLabel ? 'Password (required)' : undefined,
      inputProps: {
        onChange: {onChangePassword},
        type: 'password',
        placeholder: !useLabel ? 'Password (required)' : undefined,
        disabled: disabledFields,
      },
    };

    const confirmPwdProps = {
      labelText: useLabel ? 'Confirm password (required)' : undefined,
      inputProps: {
        onChange: {onChangeConfirmPwd},
        type: 'password',
        placeholder: !useLabel ? 'Confirm password (required)' : undefined,
        disabled: disabledFields,
      },
    };

    const defaultPwdInput = defaultPwdState !== 'null'
      ? (
        <div className={classes.inputWrapper}>
          <CustomInput
            success={defaultPwdState === 'success'}
            error={defaultPwdState === 'error'}
            id="default"
            {...defaultPwdProps}
          />
        </div>
      )
      : null;
    return (
      <React.Fragment>
        { defaultPwdInput }
        <div className={classes.inputWrapper}>
          <CustomInput
            success={passwordState === 'success'}
            error={passwordState === 'error'}
            id="password"
            {...passwordProps}
          />
          <CustomInput
            success={confirmPwdState === 'success'}
            error={confirmPwdState === 'error'}
            id="confirmPwd"
            {...confirmPwdProps}
          />
        </div>
        <small>
          Password must be from 8 to 60 characters.
          <br />
          Password must include at least 1 lowercase character(s), 1 uppercase character(s), 1 digit(s)
          and 1 special character(s) such as #?!@$%^&*-
        </small>
      </React.Fragment>
    );
  }
}

export default withStyles(registerPageStyle)(PasswordField);
