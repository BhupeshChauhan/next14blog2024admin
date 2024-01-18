"use client";
import { Button, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchClientUser } from "../../../../../lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UsersList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [Users, setUsers] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
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
      renderCell: (params) => <>User</>,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
  ];
  useEffect(() => {
    async function ApiCall() {
      const Users: any = await fetchClientUser();
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
