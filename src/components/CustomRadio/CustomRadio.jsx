import React from 'react';
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import { FormControlLabel }  from "@material-ui/core";
import PropTypes from "prop-types";

export default function CustomRadio({...props}) {
  const {
    checkedValue,
    label,
    value,
    classes,
    onClick
  } = props;
  return (
    <div
      className={
        classes.checkboxAndRadio +
        " " +
        classes.checkboxAndRadioHorizontal
      }
  >
   	<FormControlLabel
      control={
        <Radio
        	checked={checkedValue === value}
          value={value}
          onClick={onClick}
          name="service_type_counter"
          aria-label="C"
          icon={
            <FiberManualRecord
              className={classes.radioUnchecked}
            />
          }
          checkedIcon={
            <FiberManualRecord
              className={classes.radioChecked}
            />
          }
          classes={{
            checked: classes.radio
          }}
        />
      }
      classes={{
        label: classes.label
      }}
      label={label}
    />
   </div>
  );
}

CustomRadio.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.node,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]) ,
  checkedValue: PropTypes.bool,
  onClick: PropTypes.func
};	