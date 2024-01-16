"use client";
import Link from "next/link";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { useRouter } from "next/router";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { createtags } from "../../../../../lib/actions/tags.actions";
import useApi from "@/hooks/useApi";

const formArray = [
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
const initialValues = {
  name: "",
  slug: "",
  description: "",
};

const TagsAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createtags);
  const router = useRouter();

  const onAddtags = async (values: any) => {
    const res = await apiCall(values);
    if (res.status === 200) {
      router.push("/tags/list");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    slug: Yup.string().required("Slug is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Tags Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/tags/list"}>
            <Button variant="outlined">Tags List</Button>
          </Link>
        }
        formArray={formArray}
        initialValues={initialValues}
        onSubmit={onAddtags}
        validationSchema={validationSchema}
        isClear={true}
      />
    </>
  );
};

export default TagsAdd;
