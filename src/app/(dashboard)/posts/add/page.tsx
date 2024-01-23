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
import checkModulePermission, {
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";

const PostsAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(createposts);
  const [CategoryList, setCategoryList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const { userData } = useGlobalContext();
  const router = useRouter();
  const { postsFormArray, postsInitialValues, postsValidationSchema } =
    postsFormData(CategoryList, TagsList);
  const [IsPublish, setIsPublish] = useState(false);

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
      isDraft: !IsPublish,
      isPublish: IsPublish,
    });
    if (res.status === 200) router.push("/posts/list");
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
        title="Create Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/posts/list"}>
            <Button variant="outlined">Posts List</Button>
          </Link>
        }
        formArray={postsFormArray}
        initialValues={postsInitialValues}
        onSubmit={onAddPost}
        isClear={true}
        validationSchema={postsValidationSchema}
        hideSubmit={true}
        AddintionalFooterActions={(formik: any) => (
          <>
            <Button
              color="primary"
              variant="contained"
              sx={{ marginRight: "10px" }}
              type="submit"
              onClick={() => {
                setIsPublish(true);
              }}
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.POST,
                  moduleAction.PUBLISH,
                )
              }
            >
              Publish Post
            </Button>
            <Button
              color="primary"
              sx={{ marginRight: "10px" }}
              type="submit"
              variant="outlined"
              onClick={() => {
                setIsPublish(false);
              }}
              disabled={
                !checkModulePermission(
                  userData,
                  moduleName.POST,
                  moduleAction.DRAFT,
                )
              }
            >
              Draft Post
            </Button>
          </>
        )}
      />
    </>
  );
};

export default PostsAdd;
