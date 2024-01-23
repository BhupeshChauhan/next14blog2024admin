"use server";
import { connectToDB } from "../mongoose";
import tags from "../models/tags.model";
import { validatePayload } from "../utils";

export async function createtags(payload: any) {
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

    const tagsData = await tags.find();

    const newtags = new tags({
      id: tagsData.length + 1,
      name,
      slug,
      description,
      featuredImage,
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

    return JSON.parse(JSON.stringify(tagsData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchTagsById(id: any) {
  try {
    connectToDB();
    const tagsData = await tags.findOne({ id });

    return JSON.parse(JSON.stringify(tagsData));
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchTagsByName(name: any) {
  try {
    connectToDB();
    const tagsData = await tags.findOne({ name });

    return JSON.parse(JSON.stringify(tagsData));
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

    return JSON.parse(JSON.stringify(tagsData));
  } catch (error: any) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function updateTags(payload: any) {
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

    await tags.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function deleteTags(id: any) {
  try {
    connectToDB();

    const filter = { id }; // Specify the criteria for the document to update
    const update = { $set: { inActive: true } }; // Define the update operation

    await tags.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function activateTags(id: any) {
  try {
    connectToDB();

    const filter = { id }; // Specify the criteria for the document to update
    const update = { $set: { inActive: false } }; // Define the update operation

    await tags.updateOne(filter, update);
    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}
