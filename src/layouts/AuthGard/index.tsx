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

  async function HandleUserData() {
    const userData = await getModulePermissions(session?.user?.email);
    setUserData(userData?.data);
    checkModulePermissions(userData?.data);
  }
  function checkModulePermissions(userData: any) {
    const path = pathname.split("/");
    const modulePermissions = userData.modulePermissions[path[1]];
    const operationPermission =
      path[2] === "list" ? modulePermissions?.view : modulePermissions[path[2]];
    setRoutePermission(operationPermission);
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      route.replace("/login");
    } else if (status === "authenticated" && pathname === "/login") {
      route.replace("/");
    }
  }, [status, route, pathname]);

  useEffect(() => {
    if (session?.user) {
      if (userData.length === 0) HandleUserData();
      else if (userData.length > 0) checkModulePermissions(userData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user, pathname]);

  return <div>{RoutePermission ? children : <NotAuthorised />}</div>;
};

export default AuthGard;
