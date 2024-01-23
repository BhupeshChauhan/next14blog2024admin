"use client";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { fetchcategories } from "../../../../../lib/actions/categories.actions";
import { fetchtags } from "../../../../../lib/actions/tags.actions";
import { createposts } from "../../../../../lib/actions/posts.actions";
import useApi from "@/hooks/useApi";
import { useRouter } from "next/navigation";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import { useGlobalContext } from "@/context/GlobalContext";
import postsFormData from "@/Data/postFormData";

const PostsAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(createposts);
  const router = useRouter();
  const [CategoryList, setCategoryList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const { userData } = useGlobalContext();
  const { postsFormArray, postsInitialValues, postsValidationSchema } =
    postsFormData(CategoryList, TagsList);

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

  useEffect(() => {
    setIsLoading(true);
    getfetchcategories();
    getfetchtags();
    setIsLoading(false);
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
            <Button variant="outlined">Draft Posts List</Button>
          </Link>
        }
        formArray={postsFormArray}
        initialValues={postsInitialValues}
        onSubmit={onAddPost}
        isClear={true}
        validationSchema={postsValidationSchema}
      />
    </>
  );
};

export default PostsAdd;
