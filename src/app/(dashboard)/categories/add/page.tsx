"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import useApi from "@/hooks/useApi";
import { createcategories } from "../../../../../lib/actions/categories.actions";
import { useRouter } from "next/navigation";
import categoriesFormData from "@/Data/categoriesFormData";

const CategoriesAdd = () => {
  const {
    categoriesformArray,
    categoriesInitialValues,
    categoriesValidationSchema,
  } = categoriesFormData();
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createcategories);
  const router = useRouter();

  const onAddcategories = async (values: any) => {
    const res = await apiCall(values);
    if (res.status === 200) {
      router.push("/categories/list");
    }
  };

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
        formArray={categoriesformArray}
        initialValues={categoriesInitialValues}
        onSubmit={onAddcategories}
        validationSchema={categoriesValidationSchema}
        isClear={true}
      />
    </>
  );
};

export default CategoriesAdd;
