import React from "react";
import CustomTextField from "./FormFeilds/CustomTextField";
import { useFormik } from "formik";
import { Button, Card, Grid, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import CustomSelect from "./FormFeilds/CustomSelect";
import CustomImageSelect from "./FormFeilds/CustomImageSelect";

const MyClientCustomTextEditor = dynamic(
  () => import("./FormFeilds/CustomTextEditor"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false, // This ensures that the component is not server-side rendered
  },
);
interface IFormComponent {
  formArray?: any;
  initialValues?: any;
  validationSchema?: any;
  onSubmit?: any;
  isClear?: any;
  onClear?: any;
  isClose?: any;
  onClose?: any;
}
const FormComponent: React.FC<IFormComponent> = ({
  formArray,
  initialValues,
  validationSchema,
  onSubmit,
  isClear,
  onClear,
  isClose,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  const handleClear = () => {
    onClear && onClear();
    formik.resetForm();
  };

  const handleClose = () => {
    onClose && onClose();
    formik.resetForm();
  };

  const handleSaveTextEditor = (value: any, name: any) => {
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  const handleChangeSelect = (value: any, name: any) => {
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {formArray?.map((element: any, index: number) => (
          <Grid
            item
            key={index}
            xs={element?.xs}
            sm={element?.sm}
            lg={element?.lg}
            xl={element?.xl}
            display={element?.display}
            justifyContent={element?.justifyContent}
            alignItems={element?.alignItems}
          >
            <>
              {element.formInputType === "section" ? (
                <Card sx={{ padding: 2 }} variant="outlined">
                  <Typography variant="h5" color="textPrimary">
                    {element?.label}
                  </Typography>
                </Card>
              ) : null}
              {element.formInputType === "input" ? (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    {element?.label}
                  </Typography>
                  <CustomTextField
                    value={formik.values[element.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[element.name] &&
                      Boolean(formik.errors[element.name])
                    }
                    helperText={
                      formik.touched[element.name] &&
                      formik.errors[element.name]
                    }
                    id={element?.id}
                    name={element?.name}
                    label={null}
                    required={element?.required}
                    disabled={element?.disabled}
                    type={element?.type}
                    InputProps={element?.InputProps}
                    variant={element?.variant}
                    autoComplete={element?.autoComplete}
                    size={element?.size}
                    margin={element?.margin}
                    fullWidth={element?.fullWidth}
                    multiLine={element?.multiLine}
                    maxRows={element?.maxRows}
                    rows={element?.rows}
                    placeholder={element?.placeholder}
                  />
                </>
              ) : null}
              {element.formInputType === "textEditor" ? (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    {element?.label}
                  </Typography>
                  <MyClientCustomTextEditor
                    handleSubmit={handleSaveTextEditor}
                    name={element?.name}
                    EditerContent={formik.values[element.name]}
                  />
                </>
              ) : null}
              {element.formInputType === "select" ? (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    {element?.label}
                  </Typography>
                  <CustomSelect
                    value={formik.values[element?.name]}
                    handleChange={handleChangeSelect}
                    menuArray={element?.menuArray}
                    fullWidth={element?.fullWidth}
                    name={element?.name}
                    multiple={element?.multiple}
                    placeholder={element?.placeholder}
                    error={
                      formik.touched[element.name] &&
                      Boolean(formik.errors[element.name])
                    }
                    helperText={
                      formik.touched[element.name] &&
                      formik.errors[element.name]
                    }
                  />
                </>
              ) : null}
              {element.formInputType === "imageSelector" ? (
                <>
                  <Typography variant="subtitle2" color="textSecondary">
                    {element?.label}
                  </Typography>
                  <CustomImageSelect
                    value={formik.values[element?.name]}
                    handleChange={handleChangeSelect}
                    fullWidth={element?.fullWidth}
                    name={element?.name}
                    placeholder={element?.placeholder}
                  />
                </>
              ) : null}
            </>
          </Grid>
        ))}
        <Grid item xs={12} sm={12} lg={12} xl={12} sx={{ marginTop: "30px" }}>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ marginRight: "10px" }}
          >
            Submit
          </Button>
          {isClear ? (
            <Button variant="outlined" onClick={handleClear}>
              Clear
            </Button>
          ) : null}
          {isClose ? (
            <Button variant="outlined" onClick={handleClose}>
              isClose
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComponent;
