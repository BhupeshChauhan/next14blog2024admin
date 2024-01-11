/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { Grid } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CustomUploadImage() {
  const [selectedFile, setselectedFile] = useState<any>(null);
  const handleUploadClick = (event: any) => {
    console.log();
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e: any) {
      setselectedFile([reader.result]);
    };
    console.log(url); // Would see a path?

    setselectedFile(event.target.files[0]);
  };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {!selectedFile ? (
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Select Image
            <VisuallyHiddenInput type="file" onChange={handleUploadClick} />
          </Button>
        ) : (
          <>
            <Button
              component="label"
              variant="outlined"
              style={{ marginRight: "10px" }}
            >
              Change Selected Image
              <VisuallyHiddenInput type="file" onChange={handleUploadClick} />
            </Button>
            <Button variant="contained" startIcon={<CloudUploadIcon />}>
              Upload Image
            </Button>
          </>
        )}
      </Grid>

      {selectedFile ? (
        <Grid item>
          <img width="100%" src={selectedFile} />
        </Grid>
      ) : null}
    </Grid>
  );
}
