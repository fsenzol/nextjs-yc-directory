"use server"

import {auth} from "@/auth";
import {parserServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const createPitch = async (state, form: FormData, pitch:string) => {
    const session = await auth();
    if (!session) {
        return parserServerActionResponse({
            error: "Not signed in!",
            status: "error",
        })
    }

    const {title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    )
    console.log(title)
    const slug = slugify(title as string, {
        lower: true,
        strict: true
    })


    try {

        const startup = {
            title,
            description,
            category,
            image: link,
            slug : {
                _type: slug,
                current: slug
            },
            author: {
                _type: "reference",
                _ref: session?.id
            },
            pitch
        }

        const result = await writeClient.create({
            _type: "startup",
                ...startup
        })

        return parserServerActionResponse({...result, status: "success", error: ""})

    } catch (err) {
        console.log(err)
        return parserServerActionResponse({
            error: JSON.stringify(err),
            status: "error",
        })
    }
}

