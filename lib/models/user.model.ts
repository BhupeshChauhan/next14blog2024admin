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
    roleId: {
      type: Number,
    },
    client: {
      type: Boolean,
      required: true,
    },
    password: String,
    image: String,
    bio: String,
    isInActive: Boolean,
  },
  { timestamps: true },
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;
