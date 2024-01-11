/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Button, ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import CustomDialog from "../../UIComponents/CustomDialog";

type Props = {
  value?: any;
  onChange?: any;
  menuArray?: any;
  fullWidth?: any;
  handleChange?: any;
  name?: any;
  multiple?: any;
  placeholder?: any;
  label?: any;
};

const imagesArray = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

const CustomImageSelect = ({
  value,
  handleChange,
  fullWidth,
  name,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (value: any) => {
    handleChange(value, name);
    handleClose();
  };

  return (
    <>
      {!value ? (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          fullWidth={fullWidth}
        >
          {placeholder}
        </Button>
      ) : (
        <>
          <Button
            component="label"
            variant="outlined"
            onClick={handleClickOpen}
            style={{ margin: "0 10px 10px 0" }}
          >
            Change Selected Image
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onChange(null)}
            style={{ margin: "0 10px 10px 0" }}
          >
            Remove Image
          </Button>
          <img
            srcSet={`${value}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${value}?w=164&h=164&fit=crop&auto=format`}
            loading="lazy"
            style={{ height: "250px", width: "500px" }}
          />
        </>
      )}
      <CustomDialog
        visibility={open}
        closeModal={handleClose}
        modaltitle={placeholder}
      >
        <ImageList
          sx={{ width: "100%", height: "65vh" }}
          cols={3}
          rowHeight={164}
        >
          {imagesArray.map((item: any) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={
                  value === item.img
                    ? {
                        height: "100%",
                        width: "100%",
                        border: "2px solid #f7f7f7",
                      }
                    : { height: "100%", width: "100%" }
                }
                onClick={() => onChange(item.img)}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </CustomDialog>
    </>
  );
};

export default CustomImageSelect;
