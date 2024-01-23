"use server";
import { SortOrder } from "mongoose";

import { connectToDB } from "../mongoose";
import categories from "../models/categories.model";
import { validatePayload } from "../utils";

export async function createcategories(payload: any) {
  try {
    connectToDB();
    const requiredFields = ["name", "slug", "description", "featuredImage"];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { name, slug, description, featuredImage } = payload;

    const categoriesData = await categories.find();

    const newcategories = new categories({
      id: categoriesData.length + 1,
      name,
      slug,
      description,
      featuredImage,
    });

    await newcategories.save();
    return { status: 200, message: "Added Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function fetchcategories() {
  try {
    connectToDB();
    const categoriesData = await categories.find();

    return JSON.parse(JSON.stringify(categoriesData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchCategoryById(id: any) {
  try {
    connectToDB();
    const categoriesData = await categories.findOne({ id });

    return JSON.parse(JSON.stringify(categoriesData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchCategoryByName(name: any) {
  try {
    connectToDB();
    const categoriesData = await categories.findOne({ name });

    return {
      status: 200,
      message: "Succesfull",
      data: JSON.parse(JSON.stringify(categoriesData)),
    };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function updateCategory(payload: any) {
  try {
    connectToDB();
    const requiredFields = [
      "id",
      "name",
      "description",
      "slug",
      "featuredImage",
    ];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const { id, name, description, slug, featuredImage } = await payload;

    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: {
        name: name,
        description: description,
        slug: slug,
        featuredImage: featuredImage,
      },
    }; // Define the update operation

    await categories.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function deleteCategory(id: any) {
  try {
    const filter = { id }; // Specify the criteria for the document to update
    const update = { $set: { inActive: true } }; // Define the update operation

    await categories.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function activateCategory(id: any) {
  try {
    const filter = { id }; // Specify the criteria for the document to update
    const update = { $set: { inActive: false } }; // Define the update operation

    await categories.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}
