import React from "react";
import * as Yup from "yup";

const categoriesFormData = () => {
  const categoriesformArray = [
    {
      id: "name",
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
      id: "slug",
      name: "slug",
      label: "Slug",
      placeholder: "Enter Slug",
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
      id: "description",
      name: "description",
      label: "Description",
      placeholder: "Enter Description",
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
  ];

  const categoriesInitialValues = {
    name: "",
    slug: "",
    description: "",
  };

  const categoriesValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
  });

  return {
    categoriesformArray,
    categoriesInitialValues,
    categoriesValidationSchema,
  };
};

export default categoriesFormData;
