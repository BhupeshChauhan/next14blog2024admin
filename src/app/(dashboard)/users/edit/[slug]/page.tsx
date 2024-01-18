"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { usePathname, useRouter } from "next/navigation";
import rolesFormData from "@/Data/rolesFormData";
import {
  fetchRoles,
  fetchRolesbyId,
  updateRoles,
} from "../../../../../../lib/actions/roles.actions";
import { useEffect, useState } from "react";
import usersFormData from "@/Data/usersFormData";
import {
  fetchAdminUserById,
  updateUser,
} from "../../../../../../lib/actions/user.actions";

const UsersEdit = () => {
  const [RolesList, setRolesList] = useState([]);
  const pathname = usePathname();
  const { usersformArray, userInitialValues, userValidationSchema } =
    usersFormData(RolesList);
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(updateUser);
  const router = useRouter();

  const onAddUser = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/users/list");
  };

  useEffect(() => {
    async function ApiCall() {}
    ApiCall();
  }, [pathname]);

  const [userValues, setUserValues] = useState({});
  const id = pathname.split("/")[3];

  useEffect(() => {
    async function ApiCall() {
      const user: any = await fetchAdminUserById(id);
      const roles: any = await fetchRoles();
      setRolesList(roles);
      console.log(user);
      setUserValues(user);
    }
    ApiCall();
  }, [id, pathname]);

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
        formArray={usersformArray}
        initialValues={userInitialValues}
        onSubmit={onAddUser}
        isClear={true}
        validationSchema={userValidationSchema}
        isEdit={true}
        editValues={userValues}
      />
    </>
  );
};

export default UsersEdit;
