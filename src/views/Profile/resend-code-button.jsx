import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { verifyResendUser } from 'services/api/user';
import { classesType } from '../../types/global';
import { showAlert } from 'actions/alert';

class ResendCodeButton extends PureComponent {
    static propTypes = {
      email: PropTypes.string.isRequired,
      cbAfterResend: PropTypes.func.isRequired,
      countDownResendCode: PropTypes.number.isRequired,
      classes: classesType.isRequired,
      verifyResendUser: PropTypes.func.isRequired,
    }

    handleResendVerificationCode = (e) => {
      e.preventDefault();
      const { countDownResendCode } = this.props;

      if (countDownResendCode === 0) {
        const { email, cbAfterResend, verifyResendUser: verifyResendUserAction } = this.props;
        verifyResendUserAction({ email }, (response) => {
          if (response.status !== 200 || !response.data.success) {
            this.props.showAlert('error', response.data.message);
          }
          cbAfterResend();
        });
      }
    }

    render() {
      const { countDownResendCode, classes } = this.props;
      return (
        <div>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link
            to="#"
            onClick={this.handleResendVerificationCode}
            className={classes.resendCode}
            disabled={countDownResendCode > 0}
          >
            Resend code
          </Link>
          {countDownResendCode > 0 && <span>{countDownResendCode}</span>}
        </div>
      );
    }
}

export default connect(null, {
  /*verifyResendUser*/
  showAlert
})(ResendCodeButton);
