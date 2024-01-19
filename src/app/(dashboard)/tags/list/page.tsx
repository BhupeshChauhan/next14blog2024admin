"use client";
import { useEffect, useState } from "react";
import { Button, Chip, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import CustomDataGrid from "@/components/CustomDataGrid";
import {
  activateTags,
  deleteTags,
  fetchtags,
} from "../../../../../lib/actions/tags.actions";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomModal from "@/components/CustomModal";
import { useGlobalContext } from "@/context/GlobalContext";
import checkModulePermission, {
  checkPermissionDelete,
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";
import CustomMenu from "@/components/CustomMenu";
import { format, parseISO } from "date-fns";

const TagsList = () => {
  const [isLoading, setisLoading] = useState(false);
  const [DeleteMoadal, setDeleteMoadal] = useState(false);
  const [ActivateMoadal, setActivateMoadal] = useState(false);
  const [SelectedTags, setSelectedTags] = useState<any>({});
  const [tags, settags] = useState([]);

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
            onClick: () => router.push(`/tags/edit/${params?.row?.id}`),
            disable: !checkModulePermission(
              userData,
              moduleName.TAGS,
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
                setSelectedTags(params.row);
              } else if (!params.row.inActive) {
                setDeleteMoadal(true);
                setSelectedTags(params.row);
              }
            },

            disable: checkPermissionDelete(userData, params, moduleName.TAGS),
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
      headerName: "Category Name",
      flex: 1,
    },
    {
      field: "slug",
      headerName: "Category Slug",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
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
    console.log("here");
    setisLoading(true);
    await deleteTags(SelectedTags.id);
    await fetchtags().then((res) => {
      settags(res);
    });
    setDeleteMoadal(false);
    setSelectedTags({});
    setisLoading(false);
  };

  const handleActivate = async () => {
    setisLoading(true);
    await activateTags(SelectedTags.id);
    await fetchtags().then((res) => {
      settags(res);
    });
    setActivateMoadal(false);
    setSelectedTags({});
    setisLoading(false);
  };

  useEffect(() => {
    setisLoading(true);
    async function ApiCall() {
      await fetchtags().then((res) => {
        settags(res);
      });
      setisLoading(false);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDataGrid
        title="Tags List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/tags/add"}>
            <Button
              variant="outlined"
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.TAGS,
                  moduleAction.ADD,
                )
              }
            >
              Create Tag
            </Button>
          </Link>
        }
        columns={columns}
        rows={tags ? tags : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
      <CustomModal
        open={DeleteMoadal}
        title={`Do you want to Deactivate ${SelectedTags?.name} Tag`}
        content={
          "Note: If you Deactivate this tag, this tag will be removed from all the post."
        }
        handleClose={() => {
          setDeleteMoadal(false);
          setSelectedTags({});
        }}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteMoadal(false);
          setSelectedTags({});
        }}
      />
      <CustomModal
        open={ActivateMoadal}
        title={`Do you want to activate ${SelectedTags?.name} Tag`}
        content={
          "Note: If you activate this tag, this tag will be add for all the post previously assiged post."
        }
        handleClose={() => {
          setActivateMoadal(false);
          setSelectedTags({});
        }}
        onOk={handleActivate}
        onCancel={() => {
          setActivateMoadal(false);
          setSelectedTags({});
        }}
      />
    </>
  );
};

export default TagsList;
