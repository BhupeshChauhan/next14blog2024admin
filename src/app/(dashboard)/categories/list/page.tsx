"use client";
import { useEffect, useState } from "react";
import { Button, Chip, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import {
  activateCategory,
  deleteCategory,
  fetchcategories,
} from "../../../../../lib/actions/categories.actions";
import { usePathname, useRouter } from "next/navigation";
import CustomMenu from "@/components/CustomMenu";
import checkModulePermission, {
  checkPermissionDelete,
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";
import { useGlobalContext } from "@/context/GlobalContext";
import { format, parseISO } from "date-fns";
import CustomModal from "@/components/CustomModal";
import CustomCircularProgress from "@/components/CustomCircularProgress";

const CategoriesList = () => {
  const [isLoading, setisLoading] = useState(false);
  const [DeleteMoadal, setDeleteMoadal] = useState(false);
  const [ActivateMoadal, setActivateMoadal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState<any>({});

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
            onClick: () => router.push(`/categories/edit/${params?.row?.id}`),
            disable: !checkModulePermission(
              userData,
              moduleName.CATEGORIES,
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
                setSelectedCategory(params.row);
              } else if (!params.row.inActive) {
                setDeleteMoadal(true);
                setSelectedCategory(params.row);
              }
            },

            disable: checkPermissionDelete(
              userData,
              params,
              moduleName.CATEGORIES,
            ),
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
    setisLoading(true);
    await deleteCategory(SelectedCategory.id);
    await fetchcategories().then((res: any) => {
      setCategories(res);
    });
    setDeleteMoadal(false);
    setSelectedCategory({});
    setisLoading(false);
  };

  const handleActivate = async () => {
    setisLoading(true);
    await activateCategory(SelectedCategory.id);
    await fetchcategories().then((res: any) => {
      setCategories(res);
    });
    setActivateMoadal(false);
    setSelectedCategory({});
    setisLoading(false);
  };

  useEffect(() => {
    setisLoading(true);
    async function ApiCall() {
      await fetchcategories().then((res: any) => {
        setCategories(res);
      });
      setisLoading(false);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDataGrid
        title="Category List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/categories/add"}>
            <Button
              variant="outlined"
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.CATEGORIES,
                  moduleAction.ADD,
                )
              }
            >
              Create Category
            </Button>
          </Link>
        }
        columns={columns}
        rows={categories ? categories : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
      <CustomModal
        open={DeleteMoadal}
        title={`Do you want to Deactivate ${SelectedCategory?.name} Category?`}
        content={
          "Note: If you Deactivate this Category, this category will be removed from all the post."
        }
        handleClose={() => {
          setDeleteMoadal(false);
          setSelectedCategory({});
        }}
        onOk={handleDelete}
        onCancel={() => {
          setDeleteMoadal(false);
          setSelectedCategory({});
        }}
      />
      <CustomModal
        open={ActivateMoadal}
        title={`Do you want to activate ${SelectedCategory?.name} Tag`}
        content={
          "Note: If you activate this Category, this category will be add for all the post previously assiged posts."
        }
        handleClose={() => {
          setActivateMoadal(false);
          setSelectedCategory({});
        }}
        onOk={handleActivate}
        onCancel={() => {
          setActivateMoadal(false);
          setSelectedCategory({});
        }}
      />
    </>
  );
};

export default CategoriesList;
