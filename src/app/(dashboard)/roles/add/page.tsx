"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { useRouter } from "next/navigation";
import { createRoles } from "../../../../../lib/actions/roles.actions";
import rolesFormData from "@/Data/rolesFormData";

const UsersAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createRoles);
  const { rolesFormArray, rolesInitialValues, rolesValidationSchema } =
    rolesFormData();
  const router = useRouter();

  const onAddUser = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/roles/list");
  };

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Create Roles"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/roles/list"}>
            <Button variant="outlined">Roles List</Button>
          </Link>
        }
        formArray={rolesFormArray}
        initialValues={rolesInitialValues}
        onSubmit={onAddUser}
        isClear={true}
        validationSchema={rolesValidationSchema}
      />
    </>
  );
};

export default UsersAdd;
