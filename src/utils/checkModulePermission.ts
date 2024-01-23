import React from "react";

export const moduleAction = {
  ADD: "add",
  EDIT: "edit",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
  VIEW: "view",
  PUBLISH: "publish",
  DRAFT: "draft",
};

export const moduleName = {
  DASHBOARD: "dashboard",
  POST: "posts",
  CATEGORIES: "categories",
  IMAGES: "images",
  USERS: "users",
  ROLES: "roles",
  TAGS: "tags",
  DRAFT: "draft",
  CLIENTUSERS: "clientUser",
};

export const checkPermissionDelete = (
  userData: any,
  params: any,
  moduleName: any,
): boolean => {
  let disable = false;
  if (params.row.inActive) {
    disable = !checkModulePermission(
      userData,
      moduleName,
      moduleAction.ACTIVATE,
    );
  } else if (!params.row.inActive) {
    disable = !checkModulePermission(
      userData,
      moduleName,
      moduleAction.DEACTIVATE,
    );
  }
  return disable;
};

const checkModulePermission = (
  userData: any,
  moduleName: any,
  moduleAction: any,
) => {
  if (moduleName && moduleAction) {
    const modulePermissions = userData.modulePermissions?.[moduleName];
    const operationPermission = modulePermissions?.[moduleAction];
    return operationPermission;
  }
  return false;
};

export default checkModulePermission;
