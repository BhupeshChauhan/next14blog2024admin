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

const UsersEdit = () => {
  const [rolesValues, setRolesValues] = useState({});
  const pathname = usePathname();
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(updateRoles);
  const { rolesFormArray, rolesInitialValues, rolesValidationSchema } =
    rolesFormData();
  const id = pathname.split("/")[3];
  const router = useRouter();

  const onAddUser = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/roles/list");
  };
  useEffect(() => {
    async function ApiCall() {
      setIsLoading(true);
      const roles: any = await fetchRolesbyId(id);
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
        title="Edit Role"
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
        isEdit={true}
        editValues={rolesValues}
      />
    </>
  );
};

export default UsersEdit;
