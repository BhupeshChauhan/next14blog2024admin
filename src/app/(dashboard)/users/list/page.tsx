"use client";
import { Button, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchAdminUser } from "../../../../../lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomMenu from "@/components/CustomMenu";

const UsersList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [Users, setUsers] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        const menuItem = [
          {
            label: "Edit",
            onClick: () => router.push(`/users/edit/${params?.row?.id}`),
          },
        ];
        return (
          <Grid container>
            <Grid item xs={10}>
              {params.value}
            </Grid>
            <Grid item xs={2}>
              <CustomMenu menuItem={menuItem} />
            </Grid>
          </Grid>
        );
      },
    },
    {
      field: "name",
      headerName: "User's Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "User's Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "User's Role",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
  ];
  useEffect(() => {
    async function ApiCall() {
      const Users: any = await fetchAdminUser();
      setUsers(Users);
    }
    ApiCall();
  }, [pathname]);
  return (
    <>
      {/* {isLoading ? <CustomCircularProgress color="inherit" /> : <></>} */}
      <CustomDataGrid
        title="Users List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/users/add"}>
            <Button variant="outlined">Create User</Button>
          </Link>
        }
        columns={columns}
        rows={Users}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
    </>
  );
};

export default UsersList;