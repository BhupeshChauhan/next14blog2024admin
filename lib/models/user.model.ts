import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    roleId: {
      type: Number,
    },
    client: {
      type: Boolean,
      required: true,
    },
    password: String,
    bio: String,
    featured: Object,
    isInActive: Boolean,
  },
  { timestamps: true },
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
