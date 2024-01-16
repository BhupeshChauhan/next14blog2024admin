"use client";
import { Button, Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import CustomDataGrid from "@/components/CustomDataGrid";
import { fetchposts } from "../../../../../lib/actions/posts.actions";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
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
  },
  {
    field: "visibility",
    headerName: "visibility",
    flex: 1,
  },
  {
    field: "postStatus",
    headerName: "postStatus",
    flex: 1,
    renderCell: (params: any) => {
      if (params?.row?.isPublish) {
        return <Chip label="Published" color="success" variant="outlined" />;
      }
      if (params?.row?.isDraft) {
        return <Chip label="Drafted" color="primary" variant="outlined" />;
      }
      return null;
    },
  },
  // {
  //   field: "postStatus",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];
const PostsList = () => {
  const router = usePathname();
  const [Posts, setPosts] = useState([]);

  async function getPostData() {
    const posts: any = await fetchposts();
    setPosts(posts);
  }

  useEffect(() => {
    getPostData();
  }, [router]);

  return (
    <>
      <CustomDataGrid
        title="Posts List"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/posts/add"}>
            <Button variant="outlined">Create Post</Button>
          </Link>
        }
        columns={columns}
        rows={Posts}
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        disableRowSelectionOnClick={true}
        disableColumnSelector={true}
      />
    </>
  );
};

export default PostsList;
