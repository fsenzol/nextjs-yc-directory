import NextAuth from "next-auth"
import Github from 'next-auth/providers/github'
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_GITHUB_ID} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [Github],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        async signIn({user,  profile}) {
            const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id})

            if (!existingUser) {
                await writeClient.create({
                    _type: 'author',
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || ""
                })
            }

            return true;
        },

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        async jwt({token, account, profile}) {

            if (account && profile) {
                const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID, {id: profile?.id})
                token.id = user._id;
            }

            return token

        },

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        async session({token, session}) {
            Object.assign(session, {id: token?.id});
            return session;
        }
    }
})