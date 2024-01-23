"use client";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import {
  activatePosts,
  deletePosts,
  fetchDraftPosts,
} from "../../../../../lib/actions/posts.actions";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomMenu from "@/components/CustomMenu";
import checkModulePermission, {
  checkPermissionDelete,
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";
import { format, parseISO } from "date-fns";
import CustomModal from "@/components/CustomModal";

const PostsList = () => {
  const [isLoading, setisLoading] = useState(false);
  const [DeleteMoadal, setDeleteMoadal] = useState(false);
  const [ActivateMoadal, setActivateMoadal] = useState(false);
  const [Posts, setPosts] = useState([]);
  const [SelectedPost, setSelectedPost] = useState<any>({});

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
            onClick: () => router.push(`/draft/edit/${params?.row?.id}`),
            disable: !checkModulePermission(
              userData,
              moduleName.DRAFT,
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
                setSelectedPost(params.row);
              } else if (!params.row.inActive) {
                setDeleteMoadal(true);
                setSelectedPost(params.row);
              }
            },

            disable: checkPermissionDelete(userData, params, moduleName.DRAFT),
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
      field: "featuredImage",
      headerName: "Featured Image",
      flex: 1,
      renderCell: (params) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img src={params.value} width={100} height={60} />;
      },
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
    },
    {
      field: "excerpt",
      headerName: "Excerpt",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      renderCell: (params: any) => {
        return <>{format(parseISO(params?.row?.createdAt), "MMMM dd, yyyy")}</>;
      },
    },
    {
      field: "visibility",
      headerName: "visibility",
      flex: 1,
    },
    {
      field: "postStatus",
      headerName: "Post Status",
      flex: 1,
      renderCell: (params: any) => {
        if (params?.row?.isPublish) {
          return <Chip label="Published" color="success" variant="filled" />;
        }
        if (params?.row?.isDraft) {
          return <Chip label="Drafted" color="primary" variant="filled" />;
        }
        return null;
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
    await deletePosts(SelectedPost.id);
    await fetchDraftPosts().then((res) => {
      setPosts(res);
    });
    setDeleteMoadal(false);
    setSelectedPost({});
    setisLoading(false);
  };

  const handleActivate = async () => {
    setisLoading(true);
    await activatePosts(SelectedPost.id);
    await fetchDraftPosts().then((res) => {
      setPosts(res);
    });
    setActivateMoadal(false);
    setSelectedPost({});
    setisLoading(false);
  };
  useEffect(() => {
    setisLoading(true);
    async function ApiCall() {
      await fetchDraftPosts().then((res) => {
        setPosts(res);
      });
      setisLoading(false);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDataGrid
        title="Posts Draft List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/draft/add"}>
            <Button
              variant="outlined"
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.DRAFT,
                  moduleAction.ADD,
                )
              }
            >
              Create Draft Post
            </Button>
          </Link>
        }
        columns={columns}
        rows={Posts}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
      <CustomModal
        open={DeleteMoadal}
        title={`Do you want to Deactivate ${SelectedPost?.name} Draft?`}
        content={""}
        handleClose={() => {
          setDeleteMoadal(false);
          setSelectedPost({});
        }}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteMoadal(false);
          setSelectedPost({});
        }}
      />
      <CustomModal
        open={ActivateMoadal}
        title={`Do you want to activate ${SelectedPost?.name} Draft`}
        content={""}
        handleClose={() => {
          setActivateMoadal(false);
          setSelectedPost({});
        }}
        onOk={handleActivate}
        onCancel={() => {
          setActivateMoadal(false);
          setSelectedPost({});
        }}
      />
    </>
  );
};

export default PostsList;
