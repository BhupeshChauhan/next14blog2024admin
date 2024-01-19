"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchPostById, updatePosts } from "../../../../../../lib/actions/posts.actions";
import postsFormData from "@/Data/postFormData";
import { fetchcategories } from "../../../../../../lib/actions/categories.actions";
import { fetchtags } from "../../../../../../lib/actions/tags.actions";
import { useGlobalContext } from "@/context/GlobalContext";

const UsersEdit = () => {
  const [postValues, setpostValues] = useState({});
  const [CategoryList, setCategoryList] = useState([]);
  const [TagsList, setTagsList] = useState([]);
  const pathname = usePathname();
  const { userData } = useGlobalContext();
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(updatePosts);
    const { postsFormArray, postsInitialValues, postsValidationSchema } = postsFormData(CategoryList, TagsList)
    const getfetchcategories = async () => {
      const categories: any = await fetchcategories();
      setCategoryList(categories);
    };
  
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
      isDraft: true,
      isPublish: false,
    });
    if (res.status === 200) router.push("/draft/list");
  };
  useEffect(() => {
    async function ApiCall() {
      setIsLoading(true);
      getfetchcategories();
      getfetchtags();
      const post: any = await fetchPostById(id);
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
        title="Edit Draft Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/draft/list"}>
            <Button variant="outlined">Draft Posts List</Button>
          </Link>
        }
        formArray={postsFormArray}
        initialValues={postsInitialValues}
        onSubmit={onUpdatePost}
        isClear={true}
        validationSchema={postsValidationSchema}
        isEdit={true}
        editValues={postValues}
      />
    </>
  );
};

export default UsersEdit;
