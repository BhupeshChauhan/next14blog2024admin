"use server";

import { connectToDB } from "../mongoose";
import Roles from "../models/roles.model";
import { validatePayload } from "../utils";
import ModulePermissions from "../models/modulePermissions.model";
import User from "../models/user.model";

const modulePermissionsFunc = (payload: any) => {
  const modulePermissions: any = {
    dashboard: { view: false },
    posts: {
      view: false,
      add: false,
      edit: false,
      delete: false,
      publish: false,
      draft: false,
    },
    categories: { view: false, add: false, edit: false, delete: false },
    tags: { view: false, add: false, edit: false, delete: false },
    images: { view: false, add: false, edit: false, delete: false },
    users: { view: false, add: false, edit: false, delete: false },
    roles: { view: false, add: false, edit: false, delete: false },
    draft: { view: false, add: false, edit: false, delete: false },
    clientUser: { view: false },
  };
  const moduletype = [
    "dashboard",
    "posts",
    "categories",
    "tags",
    "users",
    "images",
    "roles",
    "draft",
    "clientUser",
  ];
  moduletype.forEach((element: any) => {
    if (payload[`${element}View`]) {
      modulePermissions[element].view = true;
    }
    if (payload[`${element}Add`]) {
      modulePermissions[element].add = true;
    }
    if (payload[`${element}Update`]) {
      modulePermissions[element].edit = true;
    }
    if (payload[`${element}Delete`]) {
      modulePermissions[element].delete = true;
    }
    if (payload[`${element}Publish`]) {
      modulePermissions[element].publish = true;
    }
    if (payload[`${element}Draft`]) {
      modulePermissions[element].draft = true;
    }
  });

  return modulePermissions;
};

const modulePermissionsCnvrt = (payload: any) => {
  const modulePermissions: any = payload;
  const reponse: any = {};
  const moduletype = [
    "dashboard",
    "posts",
    "categories",
    "tags",
    "users",
    "images",
    "roles",
    "draft",
    "clientUser",
  ];
  moduletype.forEach((element: any) => {
    if (modulePermissions[element]?.view) {
      reponse[`${element}View`] = true;
    } else if (!!modulePermissions[element]?.view) {
      reponse[`${element}View`] = false;
    }
    if (modulePermissions[element]?.add) {
      reponse[`${element}Add`] = true;
    } else if (!!modulePermissions[element]?.add) {
      reponse[`${element}Add`] = false;
    }
    if (modulePermissions[element]?.edit) {
      reponse[`${element}Update`] = true;
    } else if (!!modulePermissions[element]?.edit) {
      reponse[`${element}Update`] = false;
    }
    if (modulePermissions[element]?.delete) {
      reponse[`${element}Delete`] = true;
    } else if (!!modulePermissions[element]?.delete) {
      reponse[`${element}Delete`] = false;
    }
    if (modulePermissions[element]?.publish) {
      reponse[`${element}Publish`] = true;
    } else if (!!modulePermissions[element]?.publish) {
      reponse[`${element}Publish`] = false;
    }
    if (modulePermissions[element]?.draft) {
      reponse[`${element}Draft`] = true;
    } else if (!!modulePermissions[element]?.draft) {
      reponse[`${element}Draft`] = false;
    }
  });

  return reponse;
};

export async function createModulePermissions(id: any, payload: any) {
  try {
    const modulePermissions = modulePermissionsFunc(payload);

    const newModulePermissions = new ModulePermissions({
      id: id,
      ...modulePermissions,
    });
    await newModulePermissions.save();
    return { status: 200, message: "Added Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function updateModulePermissions(payload: any) {
  try {
    const modulePermissions = modulePermissionsFunc(payload);

    const filter = { id: payload.id }; // Specify the criteria for the document to update
    const update = { $set: modulePermissions }; // Define the update operation
    const res = await ModulePermissions.updateOne(filter, update);
    console.log(res);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function getModulePermissions(email: any) {
  try {
    const user: any = await User.findOne({ email: email });
    const RolesData: any = await Roles.findOne({ name: user.role });
    console.log(RolesData.id);
    const modulePermissionsData = await ModulePermissions.findOne({
      id: RolesData.id,
    });
    return {
      status: 200,
      data: {
        user: user,
        role: RolesData,
        modulePermissions: modulePermissionsData,
      },
    };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function createRoles(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "description"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { name, description } = payload;

    const RolesData = await Roles.find();

    const newRoles = new Roles({
      id: RolesData.length + 1,
      name,
      description,
    });

    await createModulePermissions(RolesData.length + 1, payload);
    await newRoles.save();
    return { status: 200, message: "Added Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function fetchRoles() {
  try {
    connectToDB();
    const RolesData = await Roles.find();

    return JSON.parse(JSON.stringify(RolesData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}
export async function fetchRolesbyId(id: any) {
  console.log(id);
  try {
    connectToDB();
    const RolesData = await Roles.findOne({ id: Number(id) });
    const modulePermissions = await ModulePermissions.findOne({ id });
    const newModulePermissions =
      await modulePermissionsCnvrt(modulePermissions);

    const response = {
      ...newModulePermissions,
      ...JSON.parse(JSON.stringify(RolesData)),
    };
    return JSON.parse(JSON.stringify(response));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}
export async function fetchRolesByName(name: any) {
  try {
    connectToDB();
    const RolesData = await Roles.findOne({ name: name });

    return { status: 200, data: RolesData };
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}
export async function updateRoles(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "description"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { id, name, description } = await payload;

    const filter = { id }; // Specify the criteria for the document to update
    const update = { $set: { name: name, description: description } }; // Define the update operation
    const res = await updateModulePermissions(payload);

    await Roles.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function deleteRoles(req: any, res: any) {
  try {
    connectToDB();
    const { name, email, password } = await req.body;

    console.log("req", req.body);
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);

    return res.status(200).json({ message: "Success ADDED" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
