import { TextField } from "@mui/material";
import React from "react";

interface IDynamicTextField {
  id?: any;
  name?: any;
  value?: any;
  defaultValue?: any;
  onChange?: any;
  label?: any;
  required?: any;
  disabled?: any;
  type?: any;
  InputProps?: any;
  helperText?: any;
  variant?: any;
  autoComplete?: any;
  size?: any;
  margin?: any;
  fullWidth?: any;
  multiLine?: any;
  maxRows?: any;
  rows?: any;
  onBlur?: any;
  error?: any;
  placeholder?: any;
}
const CustomTextField: React.FC<IDynamicTextField> = ({
  id,
  name,
  value,
  defaultValue,
  label,
  required,
  disabled,
  type,
  InputProps,
  helperText,
  variant,
  autoComplete,
  size,
  margin,
  fullWidth,
  multiLine,
  maxRows,
  rows,
  onChange,
  onBlur,
  error,
  placeholder,
}) => {
  return (
    <TextField
      id={id}
      name={name}
      value={value}
      defaultValue={defaultValue}
      label={label}
      required={required}
      disabled={disabled}
      type={type}
      InputProps={InputProps}
      helperText={helperText}
      variant={variant}
      autoComplete={autoComplete}
      size={size}
      margin={margin}
      fullWidth={fullWidth}
      multiline={multiLine}
      maxRows={maxRows}
      rows={rows}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      placeholder={placeholder}
    />
  );
};

export default CustomTextField;
