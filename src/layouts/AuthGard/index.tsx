import { useGlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getModulePermissions } from "../../../lib/actions/roles.actions";
import NotAuthorised from "../NotAuthorised";

const AuthGard = ({ children }: any) => {
  const { data: session, status, update } = useSession();
  const { userData, setUserData } = useGlobalContext();
  const [RoutePermission, setRoutePermission] = useState(true);
  const route = useRouter();
  const pathname = usePathname();

  function checkModulePermissions(userData: any) {
    const path = pathname.split("/");
    if (path[1] && !path[2]) {
      const modulePermissions = userData.modulePermissions[path[1]];
      if (path[1] === "dashboard") {
        const operationPermission = modulePermissions?.view;
        setRoutePermission(operationPermission);
      } else {
        setRoutePermission(false);
      }
    } else if (path[1] && path[2]) {
      const modulePermissions = userData.modulePermissions[path[1]];
      if (path[2] === "list") {
        const operationPermission = modulePermissions?.view;
        setRoutePermission(operationPermission);
      } else {
        const operationPermission = modulePermissions[path[2]];
        setRoutePermission(operationPermission);
      }
    }
  }

  useEffect(() => {
    if (Object.values(userData)?.length > 0) {
      checkModulePermissions(userData);
      if (pathname === "/login") {
        route.push("/dashboard");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, route, userData]);

  return <div>{RoutePermission ? children : <NotAuthorised />}</div>;
};

export default AuthGard;
