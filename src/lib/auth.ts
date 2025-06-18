import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, SessionStrategy } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // Defina seu e-mail e senha predefinidos
        const predefinedEmail = "admin@email.com";
        const predefinedPassword = "123456";

        if (
          credentials?.email === predefinedEmail &&
          credentials?.password === predefinedPassword
        ) {
          return { id: "1", name: "Admin", email: predefinedEmail };
        }

        return null; // Retorna null se falhar
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
