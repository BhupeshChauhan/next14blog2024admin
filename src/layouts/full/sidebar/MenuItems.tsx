import {
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconTypography,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
    path: "dashboard",
  },
  {
    navlabel: true,
    subheader: "Blog",
  },
  {
    id: uniqueId(),
    title: "Posts",
    icon: IconTypography,
    href: "/posts/list",
    path: "posts",
  },
  {
    id: uniqueId(),
    title: "Categories",
    icon: IconCopy,
    href: "/categories/list",
    path: "categories",
  },
  {
    id: uniqueId(),
    title: "Tags",
    icon: IconCopy,
    href: "/tags/list",
    path: "tags",
  },
  {
    navlabel: true,
    subheader: "Galery",
  },
  {
    id: uniqueId(),
    title: "Images",
    icon: IconTypography,
    href: "/galery/images/list",
    path: "images",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Users",
    icon: IconLogin,
    href: "/users/list",
  },
];

export default Menuitems;
