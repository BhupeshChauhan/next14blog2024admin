import { Button } from "@mui/material";
import Link from "next/link";
import DashboardCard from "@/components/shared/DashboardCard";
import CustomUploadImage from "@/FormComponent/FormFeilds/CustomUploadImage";

const AddImages = () => {
  return (
    <DashboardCard
      title="Upload Images"
      action={
        <Link href={"/galery/images/list"}>
          <Button variant="outlined">Images List</Button>
        </Link>
      }
    >
      <CustomUploadImage />
    </DashboardCard>
  );
};

export default AddImages;
