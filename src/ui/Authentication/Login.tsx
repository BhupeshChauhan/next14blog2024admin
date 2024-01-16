import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

import { useFormik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import CustomTextField from "@/FormComponent/FormFeilds/CustomTextField";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import { getModulePermissions } from "../../../lib/actions/roles.actions";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const Login = ({ title, subtitle, subtext }: loginType) => {
  const route = useRouter();
  const { setUserData } = useGlobalContext();

  async function HandleUserData(email: any) {
    const response = await getModulePermissions(email);
    if (response?.status === 200) {
      setUserData(response?.data);
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...values,
      });
      if (res?.status === 200) {
        await HandleUserData(values.email);
        route.push("/dashboard");
      }
    } catch (error: any) {
      //
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: null,
    },
    validationSchema: Yup.object({
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
        <Stack>
          <Box>
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
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
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
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default Login;
