import mongoose from "mongoose";

const tagsSchema = new mongoose.Schema(
  {
    id: String,
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const tags = mongoose.models?.tags || mongoose.model("tags", tagsSchema);

export default tags;
