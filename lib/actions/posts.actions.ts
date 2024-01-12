"use server";
import { SortOrder } from "mongoose";

import { connectToDB } from "../mongoose";
import posts from "../models/posts.model";

export async function createposts(req: any, res: any) {
  try {
    connectToDB();
    const {
      title,
      featuredImage,
      content,
      categories,
      tags,
      excerpt,
      visibility,
      focusKeyword,
      seoTitle,
      metaDescription,
      canonicalUrl,
      author,
    } = await req.body;

    const postsData = await posts.find();

    const newposts = new posts({
      id: postsData.length + 1,
      title,
      featuredImage,
      content,
      categories,
      tags,
      excerpt,
      visibility,
      focusKeyword,
      seoTitle,
      metaDescription,
      canonicalUrl,
      author,
    });

    await newposts.save();
    return res.status(200).json({ message: "Success ADDED", status: 200 });
  } catch (error) {
    console.error("Error:", error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
}

export async function fetchposts(req: any, res: any) {
  try {
    connectToDB();
    const postsData = await posts.find();

    return res
      .status(200)
      .json({ data: postsData, message: "SuccessFully Fetched", status: 200 });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchpostsByEmail(req: any, res: any) {
  const { email } = await req.body;
  try {
    connectToDB();
    const postsData = await posts.findOne({ email });

    return res
      .status(200)
      .json({ data: postsData, message: "posts Exists", status: 200 });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchPostByTitle(req: any, res: any) {
  const { title } = await req.body;
  try {
    connectToDB();
    const postsData = await posts.findOne({ title });

    return res
      .status(200)
      .json({ data: postsData, message: "posts Exists", status: 200 });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateposts(req: any, res: any) {
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

export async function deleteposts(req: any, res: any) {
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

export async function fetchpostsPosts(postsId: string) {
  try {
    connectToDB();

    // // Find all threads authored by the posts with the given postsId
    // const threads = await posts.findOne({ id: postsId }).populate({
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
    //         model: posts,
    //         select: "name image id", // Select the "name" and "_id" fields from the "posts" model
    //       },
    //     },
    //   ],
    // });
    // return threads;
  } catch (error) {
    console.error("Error fetching posts threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchpostss({
  postsId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  postsId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // // Calculate the number of postss to skip based on the page number and page size.
    // const skipAmount = (pageNumber - 1) * pageSize;

    // // Create a case-insensitive regular expression for the provided search string.
    // const regex = new RegExp(searchString, "i");

    // // Create an initial query object to filter postss.
    // const query: FilterQuery<typeof posts> = {
    //   id: { $ne: postsId }, // Exclude the current posts from the results.
    // };

    // // If the search string is not empty, add the $or operator to match either postsname or name fields.
    // if (searchString.trim() !== "") {
    //   query.$or = [
    //     { postsname: { $regex: regex } },
    //     { name: { $regex: regex } },
    //   ];
    // }

    // // Define the sort options for the fetched postss based on createdAt field and provided sort order.
    // const sortOptions = { createdAt: sortBy };

    // const postssQuery = posts.find(query)
    //   .sort(sortOptions)
    //   .skip(skipAmount)
    //   .limit(pageSize);

    // // Count the total number of postss that match the search criteria (without pagination).
    // const totalpostssCount = await posts.countDocuments(query);

    // const postss = await postssQuery.exec();

    // // Check if there are more postss beyond the current page.
    // const isNext = totalpostssCount > skipAmount + postss.length;

    // return { postss, isNext };
  } catch (error) {
    console.error("Error fetching postss:", error);
    throw error;
  }
}

export async function getActivity(postsId: string) {
  try {
    connectToDB();

    // // Find all threads created by the posts
    // const postsThreads = await Thread.find({ author: postsId });

    // // Collect all the child thread ids (replies) from the 'children' field of each posts thread
    // const childThreadIds = postsThreads.reduce((acc, postsThread) => {
    //   return acc.concat(postsThread.children);
    // }, []);

    // // Find and return the child threads (replies) excluding the ones created by the same posts
    // const replies = await Thread.find({
    //   _id: { $in: childThreadIds },
    //   author: { $ne: postsId }, // Exclude threads authored by the same posts
    // }).populate({
    //   path: "author",
    //   model: posts,
    //   select: "name image _id",
    // });

    // return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
