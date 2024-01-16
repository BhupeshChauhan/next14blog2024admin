"use server";
import { SortOrder } from "mongoose";

import { connectToDB } from "../mongoose";
import tags from "../models/tags.model";
import { validatePayload } from "../utils";

export async function createtags(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "slug", "description"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { name, slug, description } = payload;

    const tagsData = await tags.find();

    const newtags = new tags({
      id: tagsData.length + 1,
      name,
      slug,
      description,
    });

    await newtags.save();
    return { status: 200, message: "Added Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function fetchtags() {
  try {
    connectToDB();
    const tagsData = await tags.find();

    return tagsData;
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchtagsByEmail(req: any, res: any) {
  const { email } = await req.body;
  try {
    connectToDB();
    const tagsData = await tags.findOne({ email });

    return res.status(200).json({ data: tagsData, message: "tags Exists" });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatetags(req: any, res: any) {
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

export async function deletetags(req: any, res: any) {
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

export async function fetchtagstags(tagsId: string) {
  try {
    connectToDB();

    // // Find all threads authored by the tags with the given tagsId
    // const threads = await tags.findOne({ id: tagsId }).populate({
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
    //         model: tags,
    //         select: "name image id", // Select the "name" and "_id" fields from the "tags" model
    //       },
    //     },
    //   ],
    // });
    // return threads;
  } catch (error) {
    console.error("Error fetching tags threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchtagss({
  tagsId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  tagsId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // // Calculate the number of tagss to skip based on the page number and page size.
    // const skipAmount = (pageNumber - 1) * pageSize;

    // // Create a case-insensitive regular expression for the provided search string.
    // const regex = new RegExp(searchString, "i");

    // // Create an initial query object to filter tagss.
    // const query: FilterQuery<typeof tags> = {
    //   id: { $ne: tagsId }, // Exclude the current tags from the results.
    // };

    // // If the search string is not empty, add the $or operator to match either tagsname or name fields.
    // if (searchString.trim() !== "") {
    //   query.$or = [
    //     { tagsname: { $regex: regex } },
    //     { name: { $regex: regex } },
    //   ];
    // }

    // // Define the sort options for the fetched tagss based on createdAt field and provided sort order.
    // const sortOptions = { createdAt: sortBy };

    // const tagssQuery = tags.find(query)
    //   .sort(sortOptions)
    //   .skip(skipAmount)
    //   .limit(pageSize);

    // // Count the total number of tagss that match the search criteria (without pagination).
    // const totaltagssCount = await tags.countDocuments(query);

    // const tagss = await tagssQuery.exec();

    // // Check if there are more tagss beyond the current page.
    // const isNext = totaltagssCount > skipAmount + tagss.length;

    // return { tagss, isNext };
  } catch (error) {
    console.error("Error fetching tagss:", error);
    throw error;
  }
}

export async function getActivity(tagsId: string) {
  try {
    connectToDB();

    // // Find all threads created by the tags
    // const tagsThreads = await Thread.find({ author: tagsId });

    // // Collect all the child thread ids (replies) from the 'children' field of each tags thread
    // const childThreadIds = tagsThreads.reduce((acc, tagsThread) => {
    //   return acc.concat(tagsThread.children);
    // }, []);

    // // Find and return the child threads (replies) excluding the ones created by the same tags
    // const replies = await Thread.find({
    //   _id: { $in: childThreadIds },
    //   author: { $ne: tagsId }, // Exclude threads authored by the same tags
    // }).populate({
    //   path: "author",
    //   model: tags,
    //   select: "name image _id",
    // });

    // return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
