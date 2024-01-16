import { useGlobalContext } from "@/context/GlobalContext";
import {
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconTypography,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const MenuItems = () => {
  const { userData } = useGlobalContext();
  const items = [
    {
      navlabel: true,
      subheader: "Home",
      visibility: userData?.modulePermissions?.dashboard?.view,
    },

    {
      id: uniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/dashboard",
      path: "dashboard",
      visibility: userData?.modulePermissions?.dashboard?.view,
    },
    {
      navlabel: true,
      subheader: "Blog",
      visibility:
        userData?.modulePermissions?.draft?.view ||
        userData?.modulePermissions?.posts?.view ||
        userData?.modulePermissions?.categories?.view ||
        userData?.modulePermissions?.tags?.view,
    },
    {
      id: uniqueId(),
      title: "Posts",
      icon: IconTypography,
      href: "/posts/list",
      path: "posts",
      visibility: userData?.modulePermissions?.posts?.view,
    },
    {
      id: uniqueId(),
      title: "Draft",
      icon: IconTypography,
      href: "/draft/list",
      path: "draft",
      visibility: userData?.modulePermissions?.draft?.view,
    },
    {
      id: uniqueId(),
      title: "Categories",
      icon: IconCopy,
      href: "/categories/list",
      path: "categories",
      visibility: userData?.modulePermissions?.categories?.view,
    },
    {
      id: uniqueId(),
      title: "Tags",
      icon: IconCopy,
      href: "/tags/list",
      path: "tags",
      visibility: userData?.modulePermissions?.tags?.view,
    },
    {
      navlabel: true,
      subheader: "Galery",
      visibility: userData?.modulePermissions?.images?.view,
    },
    {
      id: uniqueId(),
      title: "Images",
      icon: IconTypography,
      href: "/galery/images/list",
      path: "images",
      visibility: userData?.modulePermissions?.images?.view,
    },
    {
      navlabel: true,
      subheader: "Auth",
      visibility:
        userData?.modulePermissions?.users?.view ||
        userData?.modulePermissions?.roles?.view,
    },
    {
      id: uniqueId(),
      title: "Admin Users",
      icon: IconLogin,
      href: "/users/list",
      visibility: userData?.modulePermissions?.users?.view,
    },
    {
      id: uniqueId(),
      title: "Client Users",
      icon: IconLogin,
      href: "/clientUsers/list",
      visibility: userData?.modulePermissions?.users?.view,
    },
    {
      id: uniqueId(),
      title: "Roles",
      icon: IconLogin,
      href: "/roles/list",
      visibility: userData?.modulePermissions?.roles?.view,
    },
  ];
  return { items };
};

export default MenuItems;
