"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import * as Yup from "yup";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { fetchcategories } from "../../../../../lib/actions/categories.actions";
import { fetchtags } from "../../../../../lib/actions/tags.actions";
import { createposts } from "../../../../../lib/actions/posts.actions";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import { useGlobalContext } from "@/context/GlobalContext";

const initialValues = {
  title: "",
  content: "<p>Enter Post Content 👋</p>",
  categories: [],
  tags: [],
};

const PostsAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createposts);
  const router = useRouter();
  const [CategoryList, setCategoryList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const { userData } = useGlobalContext();
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

  const getfetchcategories = async () => {
    const categories: any = await fetchcategories();
    setCategoryList(categories);
  };

  const getfetchtags = async () => {
    const tags: any = await fetchtags();
    setTagsList(tags);
  };

  const onAddPost = async (values: any) => {
    const res: any = await apiCall({
      ...values,
      author: userData.user,
      isDraft: true,
      isPublish: false,
    });
    if (res.status === 200) router.push("/draft/list");
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

  useEffect(() => {
    getfetchcategories();
    getfetchtags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Create Draft Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/draft/list"}>
            <Button variant="outlined">Posts Draft List</Button>
          </Link>
        }
        formArray={formArray}
        initialValues={initialValues}
        onSubmit={onAddPost}
        isClear={true}
        validationSchema={validationSchema}
      />
    </>
  );
};

export default PostsAdd;
