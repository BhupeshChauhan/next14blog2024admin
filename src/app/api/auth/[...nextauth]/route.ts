import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";
import { connectToDB } from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/user.model";
import {
  fetchRolesByName,
  getModulePermissions,
} from "../../../../../lib/actions/roles.actions";
import Roles from "../../../../../lib/models/roles.model";

const handler = NextAuth({
  //   callbacks: {
  //     session: async (session: any) => {
  //       if (!session) return;
  //       await connectToDB();

  //       const user: any = await User.findOne({ email: session?.user?.email });
  //       const RolesData: any = await Roles.findOne({ name: user.role });
  //       const modulePermission: any = await getModulePermissions(RolesData.id);
  //       session.user = {
  //         id: user.id,
  //         email: user.email,
  //         modulePermission: modulePermission,
  //       };
  //       return Promise.resolve(session);
  //     },
  //   },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        await connectToDB();

        try {
          const user = await User.findOne({ email: credentials?.email });
          if (user) {
            const decryptPassword = CryptoJS.AES.decrypt(
              user.password,
              process.env.SECRETKEY || "",
            ).toString(CryptoJS.enc.Utf8);
            const isPasswordCorrect = credentials.password === decryptPassword;
            // Any object returned will be saved in `user` property of the JWT
            if (isPasswordCorrect) {
              return user;
            } else throw new Error("password is wrong");
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;

            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],
});

export { handler as GET, handler as POST };
