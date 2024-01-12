"use server";
import { SortOrder } from "mongoose";

import { connectToDB } from "../mongoose";
import categories from "../models/categories.model";

export async function createcategories(req: any, res: any) {
  try {
    connectToDB();
    const { name, slug, description } = await req.body;

    const categoriesData = await categories.find();

    const newcategories = new categories({
      id: categoriesData.length + 1,
      name,
      slug,
      description,
    });

    await newcategories.save();
    return res.status(200).json({ message: "Success ADDED", status: 200 });
  } catch (error) {
    console.error("Error:", error);

    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
}

export async function fetchcategories(req: any, res: any) {
  try {
    connectToDB();
    const categoriesData = await categories.find();

    return res.status(200).json({
      data: categoriesData,
      message: "SuccessFully Fetched",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function fetchCategoriesByName(req: any, res: any) {
  try {
    connectToDB();
    const { name } = await req.body;
    const categoriesData = await categories.findOne({ name });

    return res.status(200).json({
      data: categoriesData,
      message: "SuccessFully Fetched",
      status: 200,
    });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchcategoriesByEmail(req: any, res: any) {
  const { email } = await req.body;
  try {
    connectToDB();
    const categoriesData = await categories.findOne({ email });

    return res
      .status(200)
      .json({ data: categoriesData, message: "categories Exists" });
  } catch (error: any) {
    console.error("Error:", error);

    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatecategories(req: any, res: any) {
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

export async function deletecategories(req: any, res: any) {
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

export async function fetchcategoriescategories(categoriesId: string) {
  try {
    connectToDB();

    // // Find all threads authored by the categories with the given categoriesId
    // const threads = await categories.findOne({ id: categoriesId }).populate({
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
    //         model: categories,
    //         select: "name image id", // Select the "name" and "_id" fields from the "categories" model
    //       },
    //     },
    //   ],
    // });
    // return threads;
  } catch (error) {
    console.error("Error fetching categories threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchcategoriess({
  categoriesId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  categoriesId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    // // Calculate the number of categoriess to skip based on the page number and page size.
    // const skipAmount = (pageNumber - 1) * pageSize;

    // // Create a case-insensitive regular expression for the provided search string.
    // const regex = new RegExp(searchString, "i");

    // // Create an initial query object to filter categoriess.
    // const query: FilterQuery<typeof categories> = {
    //   id: { $ne: categoriesId }, // Exclude the current categories from the results.
    // };

    // // If the search string is not empty, add the $or operator to match either categoriesname or name fields.
    // if (searchString.trim() !== "") {
    //   query.$or = [
    //     { categoriesname: { $regex: regex } },
    //     { name: { $regex: regex } },
    //   ];
    // }

    // // Define the sort options for the fetched categoriess based on createdAt field and provided sort order.
    // const sortOptions = { createdAt: sortBy };

    // const categoriessQuery = categories.find(query)
    //   .sort(sortOptions)
    //   .skip(skipAmount)
    //   .limit(pageSize);

    // // Count the total number of categoriess that match the search criteria (without pagination).
    // const totalcategoriessCount = await categories.countDocuments(query);

    // const categoriess = await categoriessQuery.exec();

    // // Check if there are more categoriess beyond the current page.
    // const isNext = totalcategoriessCount > skipAmount + categoriess.length;

    // return { categoriess, isNext };
  } catch (error) {
    console.error("Error fetching categoriess:", error);
    throw error;
  }
}

export async function getActivity(categoriesId: string) {
  try {
    connectToDB();

    // // Find all threads created by the categories
    // const categoriesThreads = await Thread.find({ author: categoriesId });

    // // Collect all the child thread ids (replies) from the 'children' field of each categories thread
    // const childThreadIds = categoriesThreads.reduce((acc, categoriesThread) => {
    //   return acc.concat(categoriesThread.children);
    // }, []);

    // // Find and return the child threads (replies) excluding the ones created by the same categories
    // const replies = await Thread.find({
    //   _id: { $in: childThreadIds },
    //   author: { $ne: categoriesId }, // Exclude threads authored by the same categories
    // }).populate({
    //   path: "author",
    //   model: categories,
    //   select: "name image _id",
    // });

    // return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
