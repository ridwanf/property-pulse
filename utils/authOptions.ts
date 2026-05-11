import connectDB from "@/config/database";
import User from "@/models/User";
import { Account, DefaultSession, Profile, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: { account: Account | null, profile?: Profile }) {
      console.log("account", account)
      console.log("profile", profile)
      try {
        await connectDB();
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          const userName = profile?.name?.slice(0, 20)

          await User.create({
            email: profile?.email,
            username: userName,
            image: (profile as GoogleProfile)?.picture,
          });
        }
        return true
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      try {
        const user = await User.findOne({ email: session.user?.email });
        if (session.user) {
          session.user.id = user._id.toString();
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }

    }
  }
};