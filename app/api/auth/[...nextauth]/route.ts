import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';

export const authOptions : NextAuthOptions={
    providers:[Google({
        clientId:process.env.AUTH_CLINET_ID || "",
        clientSecret:process.env.AUTH_CLIENT_SECRET || "",
    })],
    secret:process.env.AUTH_SECRET,
    session:{
        strategy:'jwt',
        maxAge: 3 * 24 * 60 * 60,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };