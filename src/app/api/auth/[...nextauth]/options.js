import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

globalThis.somethingGlobal = "somethingGlobal1983";


export const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        
        let user = null;
        // Add logic here to look up the user from the credentials supplied
        if(credentials.username === "aleks" && credentials.password ==="1234"){
          user = { 
                  id: "1", 
                  name: "Aleksandar Joksimovic", 
                  email: "someemail@example.com", 
                  role: "NormalUser"
                }
        }          
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),

    GitHubProvider({
      name: "github",
      profile(profile) {        

        let role = "Administrator";
        let someSecret = "XXXXYYYYZZZZ";

        return {
          ...profile,
          role,
          someSecret,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(`signIn callback called`);

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(`jwt callback called`);

      if (user) {
        token.role = user.role;
        token.someSecret = user.someSecret;
      }

      return token;
    },
    async session({ session, user, token }) {
      console.log(`session callback called`);

      session.user.role = token.role;
      return session;
    },
  },
};

/*

export interface DefaultUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}


export interface User extends DefaultUser {}

by default token contains DefaultUserFileds
by default session.user contains DefaultUserFileds

jwt => user param is only available on login

*/
