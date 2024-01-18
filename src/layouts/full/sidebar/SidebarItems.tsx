import React from "react";
import Menuitems from "./MenuItems";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { usePathname } from "next/navigation";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathDirect = usePathname();
  const { items } = Menuitems();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {items.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return (
              <>
                {item.visibility ? (
                  <NavGroup item={item} key={item.subheader} />
                ) : null}
              </>
            );

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <>
                {item.visibility ? (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                  />
                ) : null}
              </>
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
