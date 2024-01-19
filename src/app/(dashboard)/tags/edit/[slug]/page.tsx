"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  updateTags,
  fetchTagsById,
} from "../../../../../../lib/actions/tags.actions";
import tagsFormData from "@/Data/tagsFormData";

const UsersEdit = () => {
  const [TagValues, setTagValues] = useState({});
  const pathname = usePathname();
  const { isLoading, isError, response, apiCall, resetValues, setIsLoading } =
    useApi(updateTags);
  const { tagsFormArray, tagsInitialValues, tagsValidationSchema } =
    tagsFormData();
  const id = pathname.split("/")[3];
  const router = useRouter();

  const onAddUser = async (values: any) => {
    const res: any = await apiCall(values);
    if (res.status === 200) router.push("/tags/list");
  };
  useEffect(() => {
    setIsLoading(true);
    async function ApiCall() {
      const tags: any = await fetchTagsById(id);
      setTagValues(tags);

      setIsLoading(false);
    }
    ApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname]);

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Edit Tag"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/tags/list"}>
            <Button variant="outlined">Tags List</Button>
          </Link>
        }
        formArray={tagsFormArray}
        initialValues={tagsInitialValues}
        onSubmit={onAddUser}
        isClear={true}
        validationSchema={tagsValidationSchema}
        isEdit={true}
        editValues={TagValues}
      />
    </>
  );
};

export default UsersEdit;
