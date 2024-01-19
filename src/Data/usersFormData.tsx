import React from "react";
import * as Yup from "yup";

const usersFormData = (rolesList: any) => {
  const usersformArray = [
    {
      label: "User Details",
      formInputType: "section",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      name: "profilePicture",
      label: "Profile Picture",
      placeholder: "Select Profile Picture",
      formInputType: "imageSelector",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      fullWidth: true,
    },
    {
      id: "Name",
      name: "name",
      label: "Name",
      placeholder: "Enter Name",
      required: true,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "Email",
      name: "email",
      label: "Email",
      placeholder: "Enter Email",
      required: true,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "Password",
      name: "password",
      label: "Password",
      placeholder: "Enter Password",
      required: true,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      name: "role",
      label: "Role",
      placeholder: "Enter Role",
      formInputType: "select",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: rolesList,
      fullWidth: true,
      multiple: false,
    },
  ];

  const userInitialValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const userValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(15, "Password must be at least 15 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    role: Yup.string().required("Role is required"),
  });

  return { usersformArray, userInitialValues, userValidationSchema };
};

export default usersFormData;
