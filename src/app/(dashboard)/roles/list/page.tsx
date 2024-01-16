"use client";
import { Button, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchRoles } from "../../../../../lib/actions/roles.actions";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CustomMenu from "@/components/CustomMenu";

const RolesList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        const menuItem = [
          { label: "Edit", onClick: () => router.push(`/roles/edit/${params?.row?.id}`) },
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
      headerName: "Roles Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Roles Description",
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
      const roles: any = await fetchRoles();
      setRoles(roles);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      {/* {isLoading ? <CustomCircularProgress color="inherit" /> : <></>} */}
      <CustomDataGrid
        title="Roles List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/roles/add"}>
            <Button variant="outlined">Create Role</Button>
          </Link>
        }
        columns={columns}
        rows={roles ? roles : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
    </>
  );
};

export default RolesList;
