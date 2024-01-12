import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchUser } from "../../../../lib/actions/user.actions";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
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

const UsersList = async () => {
  const users: any = await fetchUser();
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
        rows={users ? users : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
    </>
  );
};

export default UsersList;
