import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data.user) {
          return {
            id: data.user.id,
            email: data.user.email,
            
            // بعد كدا لو هستخدم سيشن ف انا محتاج ابعت الداتا من jwt token للسيشن
            // token: data.token, // تحفظ التوكن اللي رجع من API
          };
        }
        return null;
      },
    }),
    // فبعد كدا هعمل callbacks 
//     callbacks: {
//   async jwt({ token, user }) {
//     if (user) {
//       token.accessToken = user.token;
//     }
//     return token;
//   },
//   async session({ session, token }) {
//     session.accessToken = token.accessToken;
//     return session;
//   },
// }


    
  ],
  secret: process.env.AUTH_SECRET,
});
