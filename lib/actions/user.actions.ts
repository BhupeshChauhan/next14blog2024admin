"use server";
import CryptoJS from "crypto-js";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { validatePayload } from "../utils";
import Roles from "../models/roles.model";

export async function createUser(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "email", "password", "role", 'bio', 'profilePicture'];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { name, email, password, role, bio, profilePicture } = payload;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRETKEY || "",
    ).toString();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return { status: 400, message: "Email already in use" };
    }

    const RolesData = await Roles.findOne({ name: role });
    const UserData = await User.find();

    const newUser = new User({
      id: UserData.length + 1,
      name,
      email,
      password: encryptedPassword,
      roleId: RolesData.id,
      client: false,
      bio,
      profilePicture
    });

    await newUser.save();
    return { status: 200, message: "Added Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

const getRolesData = async (UserData: any) => {
  let newUserData: any = [];
  for (const item of UserData) {
    const RolesData = await Roles.findOne({ id: Number(item?.roleId) });
    newUserData = [...newUserData, { ...item, role: RolesData?.name }];
  }
  return newUserData;
};

export async function fetchUser() {
  try {
    connectToDB();
    const UserData: any = await User.find();

    return JSON.parse(JSON.stringify(UserData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchAdminUser() {
  try {
    connectToDB();
    const UserData: any = await User.find({ client: false });
    let newUserData: any = await getRolesData(
      JSON.parse(JSON.stringify(UserData)),
    );

    return JSON.parse(JSON.stringify(newUserData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchAdminUserById(id: any) {
  try {
    connectToDB();
    const UserData: any = await User.find({ id: Number(id) });
    const RolesData = await Roles.findOne({
      id: Number(UserData?.[0]?.roleId),
    });

    const decryptPassword = CryptoJS.AES.decrypt(
      UserData[0].password,
      process.env.SECRETKEY || "",
    ).toString(CryptoJS.enc.Utf8);

    let newUserData: any = {
      ...JSON.parse(JSON.stringify(UserData))[0],
      role: JSON.parse(JSON.stringify(RolesData)).name,
      password: decryptPassword,
    };

    return JSON.parse(JSON.stringify(newUserData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchClientUser() {
  try {
    connectToDB();
    const UserData: any = await User.find({ client: true });

    return JSON.parse(JSON.stringify(UserData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchUserByEmail(email: any) {
  try {
    connectToDB();
    const UserData = await User.findOne({ email });

    return { status: 200, message: "Added Succesfully", data: UserData };
  } catch (error: any) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function updateUser(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "email", "password", "role", 'bio', "profilePicture"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { id, name, email, password, role, bio, profilePicture } = await payload;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRETKEY || "",
    ).toString();
    const RolesData = await Roles.findOne({ name: role });
    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: {
        name: name,
        email: email,
        password: encryptedPassword,
        roleId: RolesData?.id,
        bio: bio,
        profilePicture: profilePicture
      },
    }; // Define the update operation

    await User.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function deleteUser(id: any) {
  try {
    connectToDB();
    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: { inActive: true },
    }; // Define the update operation

    await User.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function activateUser(id: any) {
  try {
    connectToDB();
    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: { inActive: false },
    }; // Define the update operation

    await User.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}
