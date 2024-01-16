"use server";
import CryptoJS from "crypto-js";

import { SortOrder } from "mongoose";

import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import { validatePayload } from "../utils";
import Roles from "../models/roles.model";

export async function createUser(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "email", "password", "role"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { name, email, password, role } = payload;
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
    const requiredFields = ["name", "email", "password", "role"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { id, name, email, password, role } = await payload;
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
        role: RolesData?.name,
      },
    }; // Define the update operation

    await User.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function deleteUser(req: any, res: any) {
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

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // // Find all threads authored by the user with the given userId
    // const threads = await User.findOne({ id: userId }).populate({
    //   path: "threads",
    //   model: Thread,
    //   populate: [
    //     {
    //       path: "community",
    //       model: Community,
    //       select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
    //     },
    //     {
    //       path: "children",
    //       model: Thread,
    //       populate: {
    //         path: "author",
    //         model: User,
    //         select: "name image id", // Select the "name" and "_id" fields from the "User" model
    //       },
    //     },
    //   ],
    // });
    // return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // // Calculate the number of users to skip based on the page number and page size.
    // const skipAmount = (pageNumber - 1) * pageSize;

    // // Create a case-insensitive regular expression for the provided search string.
    // const regex = new RegExp(searchString, "i");

    // // Create an initial query object to filter users.
    // const query: FilterQuery<typeof User> = {
    //   id: { $ne: userId }, // Exclude the current user from the results.
    // };

    // // If the search string is not empty, add the $or operator to match either username or name fields.
    // if (searchString.trim() !== "") {
    //   query.$or = [
    //     { username: { $regex: regex } },
    //     { name: { $regex: regex } },
    //   ];
    // }

    // // Define the sort options for the fetched users based on createdAt field and provided sort order.
    // const sortOptions = { createdAt: sortBy };

    // const usersQuery = User.find(query)
    //   .sort(sortOptions)
    //   .skip(skipAmount)
    //   .limit(pageSize);

    // // Count the total number of users that match the search criteria (without pagination).
    // const totalUsersCount = await User.countDocuments(query);

    // const users = await usersQuery.exec();

    // // Check if there are more users beyond the current page.
    // const isNext = totalUsersCount > skipAmount + users.length;

    // return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // // Find all threads created by the user
    // const userThreads = await Thread.find({ author: userId });

    // // Collect all the child thread ids (replies) from the 'children' field of each user thread
    // const childThreadIds = userThreads.reduce((acc, userThread) => {
    //   return acc.concat(userThread.children);
    // }, []);

    // // Find and return the child threads (replies) excluding the ones created by the same user
    // const replies = await Thread.find({
    //   _id: { $in: childThreadIds },
    //   author: { $ne: userId }, // Exclude threads authored by the same user
    // }).populate({
    //   path: "author",
    //   model: User,
    //   select: "name image _id",
    // });

    // return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
