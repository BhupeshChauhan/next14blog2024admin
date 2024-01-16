import { Box, Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import useApi from "../../hooks/useApi";
import CustomTextField from "@/FormComponent/FormFeilds/CustomTextField";

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const Register = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();
  // const { isLoading, isError, response, apiCall } = useApi();
  const handleSubmit = async (values: any) => {
    // const res = await apiCall(
    //   { ...values, role: "user" },
    //   "/api/authentication",
    //   "POST",
    // );
    // if (res.status === 200) {
    //   router.push("/login");
    // }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: null,
    },
    validationSchema: Yup.object({
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
    }),
    onSubmit: handleSubmit,
  });
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <form onSubmit={formik.handleSubmit}>
        <Box>
          <Stack mb={3}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name
            </Typography>
            <CustomTextField
              id="name"
              variant="outlined"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
              mt="25px"
            >
              Email Address
            </Typography>
            <CustomTextField
              id="email"
              variant="outlined"
              name="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              variant="outlined"
              name="password"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Stack>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default Register;
