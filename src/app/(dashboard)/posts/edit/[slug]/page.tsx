"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  fetchPostById,
  updatePosts,
} from "../../../../../../lib/actions/posts.actions";
import postsFormData from "@/Data/postFormData";
import { fetchcategories } from "../../../../../../lib/actions/categories.actions";
import { fetchtags } from "../../../../../../lib/actions/tags.actions";
import { useGlobalContext } from "@/context/GlobalContext";
import checkModulePermission, {
  moduleAction,
  moduleName,
} from "@/utils/checkModulePermission";

const UsersEdit = () => {
  const [CategoryList, setCategoryList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const [IsPublish, setIsPublish] = useState(false);
  const pathname = usePathname();
  const { userData } = useGlobalContext();
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(updatePosts);
  const { postsFormArray, postsInitialValues, postsValidationSchema } =
    postsFormData(CategoryList, TagsList);
  const getfetchcategories = async () => {
    const categories: any = await fetchcategories();
    setCategoryList(categories);
  };
  const [postValues, setpostValues] = useState(postsInitialValues);

  const getfetchtags = async () => {
    const tags: any = await fetchtags();
    setTagsList(tags);
  };
  const id = pathname.split("/")[3];
  const router = useRouter();

  const onUpdatePost = async (values: any) => {
    const res: any = await apiCall({
      ...values,
      author: userData.user,
      isDraft: !IsPublish,
      isPublish: IsPublish,
    });
    if (res.status === 200) router.push("/posts/list");
  };
  useEffect(() => {
    async function ApiCall() {
      setIsLoading(true);
      getfetchcategories();
      getfetchtags();
      const post: any = await fetchPostById(id);
      console.log(post);
      setpostValues(post);
      setIsLoading(false);
    }
    ApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Edit Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/posts/list"}>
            <Button variant="outlined">Posts List</Button>
          </Link>
        }
        formArray={postsFormArray}
        initialValues={postsInitialValues}
        onSubmit={onUpdatePost}
        isClear={true}
        validationSchema={postsValidationSchema}
        isEdit={true}
        editValues={postValues}
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

export default UsersEdit;
