"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import * as Yup from "yup";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import useApi from "@/hooks/useApi";
import { createcategories } from "../../../../../lib/actions/categories.actions";
import { useRouter } from "next/navigation";

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

const CategoriesAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createcategories);
  const router = useRouter();
  const onAddcategories = async (values: any) => {
    const res = await apiCall(values);
    if (res.status === 200) {
      router.push("/categories/list");
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
        title="Create Category"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/categories/list"}>
            <Button variant="outlined">categories List</Button>
          </Link>
        }
        formArray={formArray}
        initialValues={initialValues}
        onSubmit={onAddcategories}
        validationSchema={validationSchema}
        isClear={true}
      />
    </>
  );
};

export default CategoriesAdd;
