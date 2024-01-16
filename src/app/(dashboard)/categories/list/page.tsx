"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchcategories } from "../../../../../lib/actions/categories.actions";
import { usePathname } from "next/navigation";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
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

const CategoriesList = () => {
  const router = usePathname();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function ApiCall() {
      const Categories: any = await fetchcategories();
      setCategories(Categories);
    }
    ApiCall();
  }, [router]);

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
