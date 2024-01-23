"use client";
import Link from "next/link";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import CustomDynamicForm from "@/components/CustomDynamicForm";
import { createtags } from "../../../../../lib/actions/tags.actions";
import useApi from "@/hooks/useApi";
import tagsFormData from "@/Data/tagsFormData";

const TagsAdd = () => {
  const { isLoading, isError, response, apiCall, resetValues } =
    useApi(createtags);
  const { tagsFormArray, tagsInitialValues, tagsValidationSchema } =
    tagsFormData();
  const router = useRouter();

  const onAddtags = async (values: any) => {
    const res = await apiCall(values);
    if (res.status === 200) {
      router.push("/tags/list");
    }
  };

  return (
    <>
      {isLoading ? <CustomCircularProgress color="inherit" /> : <></>}
      <CustomDynamicForm
        title="Tags Posts"
        // subtitle="All listed Blogs"
        action={
          <Link href={"/tags/list"}>
            <Button variant="outlined">Tags List</Button>
          </Link>
        }
        formArray={tagsFormArray}
        initialValues={tagsInitialValues}
        onSubmit={onAddtags}
        validationSchema={tagsValidationSchema}
        isClear={true}
      />
    </>
  );
};

export default TagsAdd;
