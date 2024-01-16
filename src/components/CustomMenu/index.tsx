import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconDotsVertical } from "@tabler/icons-react";
import { IconButton } from "@mui/material";

export default function CustomMenu({ menuItem }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ padding: 0 }}
      >
        <IconDotsVertical height={15} width={15} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuItem.map((element: any, index: any) => {
          const { onClick, label } = element;
          const handleClick = () => {
            handleClose();
            onClick();
          };
          return (
            <MenuItem key={index} onClick={handleClick}>
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
