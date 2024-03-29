"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { usePathname, useRouter } from "next/navigation";
import rolesFormData from "@/Data/rolesFormData";
import {
  fetchRolesbyId,
  updateRoles,
} from "../../../../../../lib/actions/roles.actions";
import { useEffect, useState } from "react";
import categoriesFormData from "@/Data/categoriesFormData";
import {
  fetchCategoryById,
  updateCategory,
} from "../../../../../../lib/actions/categories.actions";

const UsersEdit = () => {
  const [rolesValues, setRolesValues] = useState({});
  const pathname = usePathname();
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(updateCategory);
  const {
    categoriesformArray,
    categoriesInitialValues,
    categoriesValidationSchema,
  } = categoriesFormData();
  const id = pathname.split("/")[3];
  const router = useRouter();

  const onEditCategory = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/categories/list");
  };
  useEffect(() => {
    setIsLoading(true);
    async function ApiCall() {
      const roles: any = await fetchCategoryById(id);
      setRolesValues(roles);
      setIsLoading(false);
    }
    ApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Update Category"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/categories/list"}>
            <Button variant="outlined">Categories List</Button>
          </Link>
        }
        formArray={categoriesformArray}
        initialValues={categoriesInitialValues}
        onSubmit={onEditCategory}
        validationSchema={categoriesValidationSchema}
        isClear={true}
        isEdit={true}
        editValues={rolesValues}
      />
    </>
  );
};

export default UsersEdit;
