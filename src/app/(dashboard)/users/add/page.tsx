"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { usePathname, useRouter } from "next/navigation";
import { createUser } from "../../../../../lib/actions/user.actions";
import usersFormData from "@/Data/usersFormData";
import { useEffect, useState } from "react";
import { fetchRoles } from "../../../../../lib/actions/roles.actions";

const UsersAdd = () => {
  const [RolesList, setRolesList] = useState([]);
  const pathname = usePathname();
  const { usersformArray, userInitialValues, userValidationSchema } =
    usersFormData(RolesList);
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createUser);
  const router = useRouter();

  const onAddUser = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/users/list");
  };

  useEffect(() => {
    async function ApiCall() {
      const roles: any = await fetchRoles();
      setRolesList(roles);
    }
    ApiCall();
  }, [pathname]);

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
      />
    </>
  );
};

export default UsersAdd;
