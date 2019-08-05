import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import classnames from 'classnames';
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import moment from "moment-timezone";
import { defaultDateTimeFormat, eventStatus, boardMode, eUserType } from "constants.js";
import Button from "../../components/CustomButtons/Button";
import { classesType, verifyBookingCodeType } from 'types/global';

const useUpdateState = (verifyData, setGivenName, setEmail, setPhoneNumber) => {
  useEffect(() => {
    setGivenName(verifyData.givenName);
    setEmail(verifyData.email);
    setPhoneNumber(verifyData.phoneNumber);
  }, [
      setEmail, setGivenName, setPhoneNumber,
      verifyData.eventId, verifyData.email, verifyData.givenName, verifyData.phoneNumber
    ]
  );
}

const isEditing = (state, props) => {
  return state.givenName !== props.givenName
    || state.email !== props.email
    || state.phoneNumber !== props.phoneNumber;
}

const BookingInformation = ({
  classes, verifyData, isVerifyBookingCodeSuccess,
  updateStatus, getDisplayStatus, editGuestInfo
}) => {
  const [givenName, setGivenName] = useState(verifyData.givenName || '');
  const [email, setEmail] = useState(verifyData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(verifyData.phoneNumber || '');
  useUpdateState(verifyData, setGivenName, setEmail, setPhoneNumber);

  return (
    <GridItem xs={8} className={classnames(classes.borderLeft, classes.gridItemPadding)}>
      <h4>
        Booking information
      </h4>
      <GridContainer>
        <GridItem md={6}>
          <CustomInput
            labelText="Customer name"
            id="givenName"
            formControlProps={{ fullWidth: true }}
            inputProps={{ disabled: verifyData.userType !== eUserType.guest }}
            onChange={(e) => setGivenName(e.target.value)}
            value={givenName}
          />
        </GridItem>
        <GridItem md={6}>
          <CustomInput
            labelText="Email"
            id="email"
            formControlProps={{ fullWidth: true }}
            inputProps={{ disabled: verifyData.userType !== eUserType.guest }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </GridItem>
        <GridItem md={6}>
          <CustomInput
            labelText="Phone number"
            id="phoneNumber"
            formControlProps={{ fullWidth: true }}
            inputProps={{ disabled: verifyData.userType !== eUserType.guest }}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </GridItem>
        {verifyData.mode === boardMode.queue &&
          <GridItem md={6}>
            <CustomInput
              labelText="Position"
              id="position"
              formControlProps={{ fullWidth: true }}
              inputProps={{ disabled: true }}
              value={verifyData.position || ''}
            />
          </GridItem>}
        <GridItem md={6}>
          <CustomInput
            labelText="Slot"
            id="slot"
            formControlProps={{ fullWidth: true }}
            inputProps={{ disabled: true }}
            value={verifyData.sslot
              ? moment.tz(verifyData.sslot, verifyData.timezoneId).format(defaultDateTimeFormat)
              : ''
            }
          />
        </GridItem>
        <GridItem md={6}>
          <CustomInput
            labelText="Provider name"
            id="providerName"
            formControlProps={{ fullWidth: true }}
            inputProps={{ disabled: true }}
            value={verifyData.providerName || ''}
          />
        </GridItem>
        <GridItem md={6}>
          <CustomInput
            labelText="Service name"
            id="serviceName"
            formControlProps={{ fullWidth: true }}
            inputProps={{ disabled: true }}
            value={verifyData.serviceName || ''}
          />
        </GridItem>
        {isVerifyBookingCodeSuccess &&
          [eventStatus.unspecified, eventStatus.confirmed].includes(verifyData.status.toUpperCase())
          ? <GridItem md={12} className={classes.bookingInformationActions}>
            {verifyData.userType === eUserType.guest &&
              <Button
                color="warning"
                className={classes.checkInButton}
                onClick={editGuestInfo({ givenName, email, phoneNumber, customerId: verifyData.customerId })}
                disabled={!isEditing({ givenName, email, phoneNumber }, verifyData)}
              >
                Edit
              </Button>}
            <Button
              color="success"
              className={classes.checkInButton}
              onClick={() => updateStatus(verifyData, eventStatus.checkedIn, true)}
              disabled={isEditing({ givenName, email, phoneNumber }, verifyData)}
            >
              Check in
            </Button>
          </GridItem>
          : <GridItem md={6}>
            <CustomInput
              labelText="Status"
              id="status"
              formControlProps={{ fullWidth: true }}
              inputProps={{ disabled: true }}
              value={getDisplayStatus(verifyData.status) || ''}
            />
          </GridItem>
        }
      </GridContainer>
    </GridItem>
  )
}

BookingInformation.propTypes = {
  classes: classesType.isRequired,
  verifyData: verifyBookingCodeType.isRequired,
  isVerifyBookingCodeSuccess: PropTypes.bool.isRequired,
  updateStatus: PropTypes.func.isRequired,
  getDisplayStatus: PropTypes.func.isRequired,
  editGuestInfo: PropTypes.func.isRequired,
}

export default BookingInformation;
