import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import { Check, Clear } from "@material-ui/icons";
import PropTypes from "prop-types";
import classNames from "classnames";
import customInputStyle from "../../assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    value
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var feedbackClasses = classes.feedback;
  var min_attr= ""
  if (inputProps !== undefined) {
    if (inputProps.endAdornment !== undefined) {
      feedbackClasses = feedbackClasses + " " + classes.feedbackRight;
    }
    if (inputProps.type === 'number') {
      if (inputProps.min !== undefined)
        min_attr = inputProps.min
      else {
        min_attr = ""
      }
    }
  }
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        value={value}
        inputProps={{
          min: min_attr
        }}
        {...inputProps}
      />
      {error ? (
        <Clear className={feedbackClasses + " " + classes.labelRootError} />
      ) : success ? (
        <Check className={feedbackClasses + " " + classes.labelRootSuccess} />
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
          ]),
};

export default withStyles(customInputStyle)(CustomInput);
