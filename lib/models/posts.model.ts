import mongoose from "mongoose";

const postsSchema = new mongoose.Schema(
  {
    id: String,
    title: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    categoryIds: {
      type: Object,
      required: true,
    },
    tagIds: {
      type: Object,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      required: true,
    },
    focusKeyword: {
      type: String,
      required: true,
    },
    seoTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    canonicalUrl: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: Object,
    },
    isDraft: {
      type: Boolean,
    },
    isPublish: {
      type: Boolean,
    },
    description: String,
    slug: String,
    featured: Object,
    inActive: Boolean,
  },
  { timestamps: true },
);

const posts = mongoose.models?.posts || mongoose.model("posts", postsSchema);

export default posts;
