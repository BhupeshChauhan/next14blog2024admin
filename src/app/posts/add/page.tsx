import { useEffect, type ReactElement, useState } from "react";
import { Button } from "@mui/material";
import PageContainer from "../../../src/components/container/PageContainer";
import Layout from "../../../src/layouts";
import CustomDynamicForm from "../../../src/components/CustomDynamicForm";
import Link from "next/link";
import * as Yup from "yup";
import useApi from "../../../src/Hooks/useApi";
import { useRouter } from "next/router";
import CustomCircularProgress from "../../../src/components/CustomCircularProgress";
import { useSession } from "next-auth/react";

const initialValues = {
  title: "",
  content: "<p>Enter Post Content 👋</p>",
  categories: [],
  tags: [],
};

const PostsAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues }: any = useApi();
  const [CategoryList, setCategoryList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const formArray = [
    {
      label: "Post Details",
      formInputType: "section",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      id: "title",
      name: "title",
      label: "Post Title",
      placeholder: "Enter Post Title",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      name: "featuredImage",
      label: "Featured Image",
      placeholder: "Select Featured Image",
      formInputType: "imageSelector",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      fullWidth: true,
    },
    {
      name: "content",
      label: "Post Content",
      formInputType: "textEditor",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      name: "categories",
      label: "Categories",
      placeholder: "Enter Categories",
      formInputType: "select",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: CategoryList,
      fullWidth: true,
      multiple: true,
    },
    {
      name: "tags",
      label: "Tags",
      formInputType: "select",
      placeholder: "Enter Tags",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: TagsList,
      fullWidth: true,
      multiple: true,
    },
    {
      id: "excerpt",
      name: "excerpt",
      label: "Excerpt",
      placeholder: "Enter Excerpt",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      name: "visibility",
      label: "visibility",
      placeholder: "Enter visibility",
      formInputType: "select",
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
      menuArray: [
        {
          name: "public",
        },
        {
          name: "private",
        },
      ],
      fullWidth: true,
      multiple: false,
    },
    {
      label: "Seo Settings",
      formInputType: "section",
      xs: 12,
      sm: 12,
      lg: 12,
      xl: 12,
    },
    {
      id: "focusKeyword",
      name: "focusKeyword",
      label: "Focus Keyword",
      placeholder: "Enter Focus Keyword",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "seoTitle",
      name: "seoTitle",
      label: "SeoTitle",
      placeholder: "Enter Seo Title",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "metaDescription",
      name: "metaDescription",
      label: "Meta Description",
      placeholder: "Enter Meta Description",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
    {
      id: "canonicalUrl",
      name: "canonicalUrl",
      label: "Canonical Url",
      placeholder: "Enter Canonical Url",
      required: false,
      disabled: false,
      formInputType: "input",
      type: null,
      InputProps: null,
      variant: "outlined",
      autoComplete: null,
      size: "sm",
      margin: "none",
      fullWidth: true,
      multiLine: false,
      maxRows: null,
      rows: null,
      xs: 6,
      sm: 6,
      lg: 6,
      xl: 6,
    },
  ];

  const onAddPost = async (values: any) => {
    console.log(session);
    const res = await apiCall(
      { ...values, author: session?.user },
      "/api/posts",
      "POST",
    );
    if (res.status === 200) {
      router.push("/posts/list");
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    featuredImage: Yup.string().required("Featured Image is required"),
    content: Yup.string().required("Content is required"),
    categories: Yup.array().required("Categories is required"),
    tags: Yup.array().required("Tags is required"),
    excerpt: Yup.string().required("Excerpt is required"),
    visibility: Yup.string().required("Visibility is required"),
    focusKeyword: Yup.string().required("Focus Keyword is required"),
    seoTitle: Yup.string().required("Seo Title is required"),
    metaDescription: Yup.string().required("Meta Description is required"),
    canonicalUrl: Yup.string().required("Canonical Url is required"),
  });

  const FetchAllTags = async () => {
    try {
      await fetch("/api/categories/fetchAllCategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      })
        .then((res: any) => res.json())
        .then((data: any) => {
          if (data?.status === 200) {
            setTagsList(data?.data);
          }
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  const FetchAllCategories = async () => {
    try {
      await fetch("/api/categories/fetchAllCategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      })
        .then((res: any) => res.json())
        .then((data: any) => {
          if (data?.status === 200) {
            setCategoryList(data?.data);
          }
        });
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchAllTags();
    FetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Create Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/posts/list"}>
            <Button variant="outlined">Posts List</Button>
          </Link>
        }
        formArray={formArray}
        initialValues={initialValues}
        onSubmit={onAddPost}
        isClear={true}
        validationSchema={validationSchema}
      />
    </PageContainer>
  );
};

export default PostsAdd;
PostsAdd.getLayout = function getLayout(page: ReactElement) {
  return <Layout type="Full">{page}</Layout>;
};
