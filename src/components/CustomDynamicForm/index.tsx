"use client";
import Box from "@mui/material/Box";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import FormComponent from "../../FormComponent";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  formArray?: any;
  initialValues?: any;
  onSubmit?: any;
  validationSchema?: any;
  isClear?: any;
  onClear?: any;
  isClose?: any;
  onClose?: any;
  isEdit?: any;
  editValues?: any;
  AddintionalFooterActions?: any;
  hideSubmit?: any;
};

export default function CustomDynamicForm({
  title,
  subtitle,
  action,
  footer,
  formArray,
  initialValues,
  onSubmit,
  validationSchema,
  isClear,
  onClear,
  isClose,
  onClose,
  isEdit,
  editValues,
  AddintionalFooterActions,
  hideSubmit,
}: Props) {
  return (
    <Card
      sx={{
        padding: 0,
        marginBottom: "20px",
        width: "100%",
        overflowY: "scroll",
        maxHeight: "calc(100vh - 130px)",
      }}
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
        <FormComponent
          formArray={formArray}
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          isClear={isClear}
          onClear={onClear}
          isClose={isClose}
          onClose={onClose}
          isEdit={isEdit}
          editValues={editValues}
          AddintionalFooterActions={AddintionalFooterActions}
          hideSubmit={hideSubmit}
        />
        {footer}
      </CardContent>
    </Card>
  );
}
