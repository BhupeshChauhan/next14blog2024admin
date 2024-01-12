"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, Stack, Typography } from "@mui/material";

type Props = {
  rows: any;
  columns: any;
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  pageSize?: number;
  pageSizeOptions?: any;
  checkboxSelection?: any;
  disableRowSelectionOnClick?: any;
  disableColumnSelector?: any;
};

export default function CustomDataGrid({
  title,
  subtitle,
  action,
  footer,
  pageSize,
  rows,
  columns,
  pageSizeOptions,
  checkboxSelection,
  disableRowSelectionOnClick,
  disableColumnSelector,
}: Props) {
  return (
    <Card
      sx={{ padding: 0, marginBottom: "20px", width: "100%" }}
      elevation={9}
      variant={undefined}
    >
      <CardContent sx={{ p: "30px" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems={"center"}
          mb={3}
        >
          <Box>
            {title ? <Typography variant="h5">{title}</Typography> : ""}

            {subtitle ? (
              <Typography variant="subtitle2" color="textSecondary">
                {subtitle}
              </Typography>
            ) : (
              ""
            )}
          </Box>
          {action}
        </Stack>
        <div style={{ height: "65vh", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pageSize,
                },
              },
            }}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection={checkboxSelection}
            disableRowSelectionOnClick={disableRowSelectionOnClick}
            disableColumnSelector={disableColumnSelector}
          />
        </div>
        {footer}
      </CardContent>
    </Card>
  );
}
