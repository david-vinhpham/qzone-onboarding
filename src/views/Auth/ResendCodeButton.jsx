import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyResendUser } from "../../actions/auth";

class ResendCodeButton extends PureComponent {
    static propTypes = {
        email: PropTypes.string.isRequired,
        cbAfterResend: PropTypes.func.isRequired,
        countDownResendCode: PropTypes.number.isRequired,
        classes: PropTypes.object.isRequired,
        verifyResendUser: PropTypes.func.isRequired,
    }

    handleResendVerificationCode = (e) => {
        e.preventDefault();
        const { countDownResendCode } = this.props;

        if (countDownResendCode === 0) {
            const { email, cbAfterResend, verifyResendUser } = this.props;
            verifyResendUser({ email }, (response) => {
                if (response.status !== 200) {
                    SweetAlert.error(response.data.message, { effect: 'bouncyflip' });
                }
                cbAfterResend();
            });
        }
    }

    render() {
        const { countDownResendCode, classes } = this.props;
        return (
            <div>
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

export default connect(null, { verifyResendUser })(ResendCodeButton);
