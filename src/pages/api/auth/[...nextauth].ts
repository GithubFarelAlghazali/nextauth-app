import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";

const authOptions: NextAuthOptions = {
     session: {
          strategy: "jwt",
     },
     secret: process.env.NEXTAUTH_SECRET,
     providers: [
          CredentialsProvider({
               type: "credentials",
               name: "Credentials",
               credentials: {
                    fullname: { label: "Full name", type: "text" },
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
               },
               async authorize(credentials, req) {
                    const { email, password, fullname } = credentials as {
                         email: string;
                         password: string;
                         fullname: string;
                    };
                    const user: any = {
                         id: 1,
                         fullname: fullname,
                         email: email,
                         password: password,
                    };
                    if (user) {
                         return user;
                    } else {
                         return null;
                    }
               },
          }),
     ],
     callbacks: {
          jwt({ token, account, profile, user }: any) {
               if (account?.provider === "credentials") {
                    token.email = user.email;
                    token.fullname = user.fullname;
               }
               return token;
          },
          async session({ session, token }: any) {
               if ("email" in token) {
                    session.user.email = token.email;
               }
               if ("fullname" in token) {
                    session.user.fullname = token.fullname;
               }
               return session;
          },
     },
};

export default NextAuth(authOptions);
