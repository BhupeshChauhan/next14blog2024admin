"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { GridColDef } from "@mui/x-data-grid";
import { usePathname } from "next/navigation";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchtags } from "../../../../../lib/actions/tags.actions";

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

const TagsList = () => {
  const router = usePathname();
  const [tags, settags] = useState([]);

  useEffect(() => {
    async function ApiCall() {
      const tags: any = await fetchtags();
      settags(tags);
    }
    ApiCall();
  }, [router]);

  return (
    <>
      <CustomDataGrid
        title="Tags List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/tags/add"}>
            <Button variant="outlined">Create Tag</Button>
          </Link>
        }
        columns={columns}
        rows={tags ? tags : []}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
    </>
  );
};

export default TagsList;
