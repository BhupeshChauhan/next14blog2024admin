import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomCheckboxGroup = ({ CheckboxOptions, formik }: any) => {
  const checkInterminate = () => {
    let values: any = [];
    CheckboxOptions.forEach((element: any) => {
      values.push(formik.values[element.name]);
    });
    let check = values.every((value: any) => value && value === true);
    let checkFalse = values.every((value: any) => value !== true);
    if (checkFalse) {
      return false;
    } else if (!check) {
      return true;
    } else {
      return false;
    }
  };
  const checkAll = () => {
    let values: any = [];
    CheckboxOptions.forEach((element: any) => {
      values.push(formik.values[element.name]);
    });
    let check = values.every((value: any) => value && value === true);
    return check;
  };
  const handleChangeChild = (e: any, name: any) => {
    formik.setValues({
      ...formik.values,
      [name]: e.target.checked,
    });
  };
  const handleChangeParent = async (e: any) => {
    let values: any = [];
    await CheckboxOptions.forEach((element: any) => {
      values = { ...values, [element.name]: e.target.checked };
    });
    formik.setValues({
      ...formik.values,
      ...values,
    });
  };

  return (
    <>
      <FormControlLabel
        label="All"
        control={
          <Checkbox
            checked={checkAll()}
            indeterminate={checkInterminate()}
            onChange={handleChangeParent}
          />
        }
      />
      {CheckboxOptions.map((data: any, index: any) => (
        <FormControlLabel
          label={data.label}
          key={index}
          name={data.name}
          control={
            <Checkbox
              checked={formik.values[data.name]}
              onChange={(e) => handleChangeChild(e, data.name)}
            />
          }
        />
      ))}
    </>
  );
};

export default CustomCheckboxGroup;
