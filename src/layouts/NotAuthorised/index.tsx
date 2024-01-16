import React from "react";
import FullLayout from "../full/FullLayout";
import DashboardCard from "@/components/shared/DashboardCard";
import { Typography } from "@mui/material";

const NotAuthorised = () => {
  return (
    <FullLayout>
      <DashboardCard title="UnAuthorised Request">
        <Typography>
          You Dont Have Required permission to access this resource.
        </Typography>
      </DashboardCard>
    </FullLayout>
  );
};

export default NotAuthorised;
