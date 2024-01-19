"use client";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import {
  activateRole,
  deleteRole,
  fetchRoles,
} from "../../../../../lib/actions/roles.actions";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import CustomMenu from "@/components/CustomMenu";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomModal from "@/components/CustomModal";
import { format, parseISO } from "date-fns";
import checkModulePermission, {
  checkPermissionDelete,
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";
import { useGlobalContext } from "@/context/GlobalContext";

const RolesList = () => {
  const [isLoading, setisLoading] = useState(false);
  const [DeleteMoadal, setDeleteMoadal] = useState(false);
  const [ActivateMoadal, setActivateMoadal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [SelectedRole, setSelectedRole] = useState<any>({});
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
            onClick: () => router.push(`/roles/edit/${params?.row?.id}`),
            disable: !checkModulePermission(
              userData,
              moduleName.ROLES,
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
                setSelectedRole(params.row);
              } else if (!params.row.inActive) {
                setDeleteMoadal(true);
                setSelectedRole(params.row);
              }
            },

            disable: checkPermissionDelete(userData, params, moduleName.ROLES),
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
    await deleteRole(SelectedRole.id);
    await fetchRoles().then((res) => {
      setRoles(res);
    });
    setDeleteMoadal(false);
    setSelectedRole({});
    setisLoading(false);
  };

  const handleActivate = async () => {
    setisLoading(true);
    await activateRole(SelectedRole.id);
    await fetchRoles().then((res) => {
      setRoles(res);
    });
    setActivateMoadal(false);
    setSelectedRole({});
    setisLoading(false);
  };
  useEffect(() => {
    setisLoading(true);
    async function ApiCall() {
      await fetchRoles().then((res) => {
        setRoles(res);
      });
      setisLoading(false);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDataGrid
        title="Roles List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/roles/add"}>
            <Button
              variant="outlined"
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.ROLES,
                  moduleAction.ADD,
                )
              }
            >
              Create Role
            </Button>
          </Link>
        }
        columns={columns}
        rows={roles ? roles : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
      <CustomModal
        open={DeleteMoadal}
        title={`Do you want to Deactivate ${SelectedRole?.name} Role`}
        content={
          "Note: If you Deactivate this role all the users associated with this role will also be deactivated."
        }
        handleClose={() => {
          setDeleteMoadal(false);
          setSelectedRole({});
        }}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteMoadal(false);
          setSelectedRole({});
        }}
      />
      <CustomModal
        open={ActivateMoadal}
        title={`Do you want to activate ${SelectedRole?.name} Role`}
        content={
          "Note: If you activate this role all the users associated with this role will also be activated."
        }
        handleClose={() => {
          setActivateMoadal(false);
          setSelectedRole({});
        }}
        onOk={handleActivate}
        onCancel={() => {
          setActivateMoadal(false);
          setSelectedRole({});
        }}
      />
    </>
  );
};

export default RolesList;
