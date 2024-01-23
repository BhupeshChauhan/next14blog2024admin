"use server";

import { connectToDB } from "../mongoose";
import posts from "../models/posts.model";
import { validatePayload } from "../utils";
import { fetchCategoryById, fetchCategoryByName } from "./categories.actions";
import { fetchTagsById, fetchTagsByName } from "./tags.actions";
import { fetchAdminUserById } from "./user.actions";

const getTagIds = async (tags: any) => {
  let tagIdsArray = [];
  for (const tag of tags) {
    const tagObj: any = await fetchTagsByName(tag);
    tagIdsArray.push(tagObj.id);
  }
  return tagIdsArray;
};

const getCategoryIds = async (categories: any) => {
  let categoryIdsArray = [];
  for (const category of categories) {
    const categoryObj: any = await fetchCategoryByName(category);
    categoryIdsArray.push(categoryObj.data.id);
  }
  return categoryIdsArray;
};

const getTagNames = async (tags: any) => {
  let tagIdsArray = [];
  for (const tag of tags) {
    const tagObj: any = await fetchTagsById(tag);
    if (!tagObj.inActive) {
      tagIdsArray.push(tagObj.name);
    }
  }
  return tagIdsArray;
};

const getCategoryNames = async (categories: any) => {
  let categoryIdsArray = [];
  for (const category of categories) {
    const categoryObj: any = await fetchCategoryById(category);
    if (!categoryObj.inActive) {
      categoryIdsArray.push(categoryObj.name);
    }
  }
  return categoryIdsArray;
};

const getPostsData = async (posts: any) => {
  let newData: any = [];
  for (const post of posts) {
    let postData: any = [];
    const { categoryIds, tagIds, featured } = post;
    let categories: any = [];
    if (categoryIds.length > 0) {
      for (const id of categoryIds) {
        categories = await getCategoryNames(id);
      }
    }
    postData = { ...post, categories: categories };
    delete postData.categoryIds;

    let tags: any = [];
    if (tagIds.length > 0) {
      for (const id of tagIds) {
        tags = await getTagNames(id);
      }
    }

    postData = { ...postData, tags: tags };
    delete postData.tagIds;

    postData = {
      ...postData,
      featuredHome: featured?.featuredHome,
      featuredEditorPick: featured?.featuredEditorPick,
    };
    delete postData.featured;

    newData.push(postData);
  }
  return newData;
};

const getPostsFeaturedHome = async (posts: any) => {
  let newData: any = [];
  for (const post of posts) {
    let postData: any = [];
    const { categoryIds, tagIds, featured } = post;
    let categories: any = [];
    if (categoryIds.length > 0) {
      for (const id of categoryIds) {
          categories = await getCategoryNames(id)
      }
    }
    postData = { ...post, categories: categories };
    delete postData.categoryIds;

    let tags: any = [];
    if (tagIds.length > 0) {
      for (const id of tagIds) {
         tags = await getTagNames(id)
      }
    }
    postData = { ...postData, tags: tags };
    delete postData.tagIds;

    postData = { ...postData, featuredHome: featured?.featuredHome, featuredEditorPick: featured?.featuredEditorPick };
    delete postData.featured;

    const author = await fetchAdminUserById(postData?.author?.id);
    postData = { ...postData, author: author };
    
    if(postData?.featuredHome){
      newData.push(postData);
    }
  }
  return newData;
};

export async function createposts(payload: any) {
  try {
    connectToDB();
    const requiredFields = [
      "title",
      "featuredImage",
      "content",
      "description",
      "slug",
      "categories",
      "tags",
      "excerpt",
      "visibility",
      "focusKeyword",
      "seoTitle",
      "metaDescription",
      "canonicalUrl",
      "author",
    ];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
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
      description,
      slug,
      metaDescription,
      canonicalUrl,
      author,
      isDraft,
      isPublish,
      featuredHome,
      featuredEditorPick,
    } = payload;

    let categoryIds = await getCategoryIds(categories);
    let tagIds = await getTagIds(tags);

    const postsData = await posts.find();

    const newposts = new posts({
      id: postsData?.length + 1,
      title,
      featuredImage,
      content,
      categoryIds,
      tagIds,
      excerpt,
      visibility,
      description,
      slug,
      focusKeyword,
      seoTitle,
      metaDescription,
      canonicalUrl,
      author,
      isDraft,
      isPublish,
      featured: {
        featuredHome: featuredHome,
        featuredEditorPick: featuredEditorPick,
      },
    });

    await newposts.save();
    return { status: 200, message: "Added Succesfully" };
  } catch (error) {
    console.error("Error:", error);

    return { status: 500, message: "Internal Server Error" };
  }
}

export async function fetchposts() {
  try {
    connectToDB();
    let postsData = await posts.find();
    let PublishedPosts: any = [];

    if (postsData.length > 0) {
      PublishedPosts = await getPostsData(
        JSON.parse(JSON.stringify(postsData)),
      );
    }

    return PublishedPosts;
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchPostsFeaturedHome() {
  try {
    connectToDB();
    let postsData = await posts.find();
    let PublishedPosts: any = [];

    if (postsData.length > 0) {
      PublishedPosts = await getPostsFeaturedHome(
        JSON.parse(JSON.stringify(postsData)),
      );
    }

    return PublishedPosts;
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchDraftPosts() {
  try {
    connectToDB();
    let postsData = await posts.find({ isDraft: true });

    let draftPosts: any = [];
    if (postsData.length > 0) {
      draftPosts = await getPostsData(JSON.parse(JSON.stringify(postsData)));
    }

    return draftPosts;
  } catch (error: any) {
    console.error("Error:", error);

    // throw new Error("Failed to fetch")
  }
}

export async function fetchPostBySlug(slug: any) {
  try {
    connectToDB();
    const postsData = await posts.findOne({ slug });
    let newPosts: any = [];
    if (postsData.length > 0) {
      newPosts = await getPostsData(JSON.parse(JSON.stringify(postsData)));
    }
    return newPosts;
  } catch (error: any) {
    console.error("Error:", error);

    // return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function fetchPostById(id: any) {
  try {
    connectToDB();
    const postsData = await posts.findOne({ id });
    let newPosts: any = [];
    newPosts = await getPostsData([JSON.parse(JSON.stringify(postsData))]);
    return newPosts[0];
  } catch (error: any) {
    console.error("Error:", error);

    // return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updatePosts(payload: any) {
  try {
    connectToDB();
    const requiredFields = [
      "title",
      "featuredImage",
      "content",
      "description",
      "slug",
      "categories",
      "tags",
      "excerpt",
      "visibility",
      "focusKeyword",
      "seoTitle",
      "metaDescription",
      "canonicalUrl",
      "author",
    ];
    const validate = validatePayload(payload, requiredFields);
    if (!validate?.payloadIsCurrect) {
      return {
        status: 400,
        message: `Missing required fields: ${validate.missingFields}`,
      };
    }
    const {
      id,
      title,
      featuredImage,
      content,
      categories,
      tags,
      excerpt,
      visibility,
      focusKeyword,
      seoTitle,
      description,
      slug,
      metaDescription,
      canonicalUrl,
      author,
      isDraft,
      isPublish,
      featuredHome,
      featuredEditorPick,
    } = payload;

    let categoryIds = await getCategoryIds(categories);
    let tagIds = await getTagIds(tags);

    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: {
        title,
        featuredImage,
        content,
        categoryIds,
        tagIds,
        excerpt,
        visibility,
        description,
        slug,
        focusKeyword,
        seoTitle,
        metaDescription,
        canonicalUrl,
        author,
        isDraft,
        isPublish,
        featured: {
          featuredHome: featuredHome,
          featuredEditorPick: featuredEditorPick,
        },
      },
    }; // Define the update operation

    await posts.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function deletePosts(id: any) {
  try {
    connectToDB();
    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: {
        inActive: true,
      },
    }; // Define the update operation

    await posts.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function activatePosts(id: any) {
  try {
    connectToDB();
    const filter = { id }; // Specify the criteria for the document to update
    const update = {
      $set: {
        inActive: false,
      },
    }; // Define the update operation

    await posts.updateOne(filter, update);

    return { status: 200, message: "Updated Succesfully" };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, message: "Internal Server Error" };
  }
}
