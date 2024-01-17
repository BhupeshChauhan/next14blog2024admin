"use client";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchcategories } from "../../../../../lib/actions/categories.actions";
import { usePathname, useRouter } from "next/navigation";
import CustomMenu from "@/components/CustomMenu";

const CategoriesList = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      renderCell: (params) => {
        const menuItem = [
          {
            label: "Edit",
            onClick: () => router.push(`/categories/edit/${params?.row?.id}`),
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
    },
  ];
  useEffect(() => {
    async function ApiCall() {
      const Categories: any = await fetchcategories();
      setCategories(Categories);
    }
    ApiCall();
  }, [pathname]);

  return (
    <>
      <CustomDataGrid
        title="Category List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/categories/add"}>
            <Button variant="outlined">Create Category</Button>
          </Link>
        }
        columns={columns}
        rows={categories ? categories : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
    </>
  );
};

export default CategoriesList;
