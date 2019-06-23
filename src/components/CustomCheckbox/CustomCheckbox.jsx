import React from 'react';
import { FormControlLabel,Checkbox }  from "@material-ui/core";
import PropTypes from "prop-types";
import Check from "@material-ui/icons/Check";

export default function CustomCheckbox({...props}) {
  const {
    label,
    value,
    classes,
    checked,
    onChange,
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
          <Checkbox
            tabIndex={-1}
            value={value}
            onChange={onChange}
            checked={checked}
            checkedIcon={
              <Check className={classes.checkedIcon} />
            }
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{
              checked: classes.checked
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

CustomCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.node,
  value: PropTypes.string,
  onClick: PropTypes.func,
  checked: PropTypes.bool

};
