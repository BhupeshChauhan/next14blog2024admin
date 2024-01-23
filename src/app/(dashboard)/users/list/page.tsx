"use client";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import {
  activateUser,
  deleteUser,
  fetchAdminUser,
} from "../../../../../lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CustomMenu from "@/components/CustomMenu";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomModal from "@/components/CustomModal";
import { parseISO, format } from "date-fns";
import { useGlobalContext } from "@/context/GlobalContext";
import checkModulePermission, {
  checkPermissionDelete,
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";

const UsersList = () => {
  const [isLoading, setisLoading] = useState(false);
  const [DeleteMoadal, setDeleteMoadal] = useState(false);
  const [ActivateMoadal, setActivateMoadal] = useState(false);
  const [SelectedUser, setSelectedUser] = useState<any>({});
  const [Users, setUsers] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const { userData } = useGlobalContext();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        const menuItem = [
          {
            label: <Typography color="blue">Edit</Typography>,
            onClick: () => router.push(`/users/edit/${params?.row?.id}`),
            disable: !checkModulePermission(
              userData,
              moduleName.USERS,
              moduleAction.EDIT,
            ),
          },
          {
            label: (
              <Typography color={params.row.inActive ? "green" : "red"}>
                {params.row.inActive ? "Activate" : "Deactivate"}
              </Typography>
            ),
            onClick: () => {
              if (params.row.inActive) {
                setActivateMoadal(true);
                setSelectedUser(params.row);
              } else if (!params.row.inActive) {
                setDeleteMoadal(true);
                setSelectedUser(params.row);
              }
            },
            disable: checkPermissionDelete(userData, params, moduleName.USERS),
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
      field: "profilePicture",
      headerName: "Profile Picture",
      flex: 1,
      renderCell: (params) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img src={params.value} width={100} height={60} />;
      },
    },
    {
      field: "bio",
      headerName: "User's Bio",
      flex: 1,
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
      renderCell: (params: any) => {
        return <>{format(parseISO(params?.row?.createdAt), "MMMM dd, yyyy")}</>;
      },
    },
    {
      field: "inActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => {
        if (params?.row?.inActive) {
          return (
            <Chip label="Deactivated" color="warning" variant="outlined" />
          );
        } else if (!params?.row?.inActive) {
          return <Chip label="Active" color="primary" variant="outlined" />;
        }
        return null;
      },
    },
  ];

  const handleDelete = async () => {
    setisLoading(true);
    await deleteUser(SelectedUser.id);
    await fetchAdminUser().then((res: any) => {
      setUsers(res);
    });
    setDeleteMoadal(false);
    setSelectedUser({});
    setisLoading(false);
  };

  const handleActivate = async () => {
    setisLoading(true);
    await activateUser(SelectedUser.id);
    await fetchAdminUser().then((res: any) => {
      setUsers(res);
    });
    setActivateMoadal(false);
    setSelectedUser({});
    setisLoading(false);
  };

  useEffect(() => {
    setisLoading(true);
    async function ApiCall() {
      await fetchAdminUser().then((res: any) => {
        setUsers(res);
      });
      setisLoading(false);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDataGrid
        title="Users List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/users/add"}>
            <Button
              variant="outlined"
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.USERS,
                  moduleAction.ADD,
                )
              }
            >
              Create User
            </Button>
          </Link>
        }
        columns={columns}
        rows={Users}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
      <CustomModal
        open={DeleteMoadal}
        title={`Do you want to Deactivate ${SelectedUser?.name} Role`}
        content={
          "Note: If you deactivate this user, User will not be able to login into the system again."
        }
        handleClose={() => {
          setDeleteMoadal(false);
          setSelectedUser({});
        }}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteMoadal(false);
          setSelectedUser({});
        }}
      />
      <CustomModal
        open={ActivateMoadal}
        title={`Do you want to activate ${SelectedUser?.name} Role`}
        content={
          "Note: If you activate this user, User will be able to login into the system again."
        }
        handleClose={() => {
          setActivateMoadal(false);
          setSelectedUser({});
        }}
        onOk={handleActivate}
        onCancel={() => {
          setActivateMoadal(false);
          setSelectedUser({});
        }}
      />
    </>
  );
};

export default UsersList;
