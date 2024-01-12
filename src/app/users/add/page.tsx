"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import * as Yup from "yup";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { useRouter } from "next/navigation";
import { createUser } from "../../../../lib/actions/user.actions";

const formArray = [
  {
    label: "User Details",
    formInputType: "section",
    xs: 12,
    sm: 12,
    lg: 12,
    xl: 12,
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
    menuArray: [
      {
        name: "admin",
      },
      {
        name: "editor",
      },
      {
        name: "user",
      },
    ],
    fullWidth: true,
    multiple: false,
  },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const UsersAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createUser);
  const router = useRouter();

  const onAddUser = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/users/list");
  };

  const validationSchema = Yup.object({
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

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Create User"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/users/list"}>
            <Button variant="outlined">Users List</Button>
          </Link>
        }
        formArray={formArray}
        initialValues={initialValues}
        onSubmit={onAddUser}
        isClear={true}
        validationSchema={validationSchema}
      />
    </>
  );
};

export default UsersAdd;
