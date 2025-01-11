import React, {Suspense} from 'react'
import {client} from "@/sanity/lib/client";
import {PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import {formatDate} from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdown from 'markdown-it';
import {Skeleton} from '@/components/ui/skeleton'
import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import View from "@/components/View";
export const experimental_ppr = true;
const md = markdown();

const Page = async ({params}: {params: Promise<{id: string}>}) => {
    const id = (await params).id


    const [post, editorPicks] = await Promise.all([
         client.fetch(STARTUP_BY_ID, {id}),
        await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
            slug: "editor-picks"
        })
    ])


    const {_createdAt, title, description, image, author, category} = post;
    const parsedContent = md.render(post?.pitch || '')

    if (!post) {
        return notFound();
    }

    return (
        <main>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(_createdAt)}</p>
                <h1 className="heading">{title}</h1>
                <p className="sub-heading !max-w-5xl">{description}</p>
            </section>

            <section className="section_container">
                <Image src={image}
                    alt="thumbnail"
                       width={3000}
                       height={3000}
                     className="w-full h-auto rounded-xl"
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/users/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={author?.image}
                                   alt="avatar" width={64}
                                   height={64}
                                   className="rounded-full drop-shadow-lg"
                            />

                            <div>
                                <p className="text-20-medium">{author?.name}</p>
                                <p className="text-16-medium !text-black-300">@{author?.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">{category}</p>

                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                      <section
                        dangerouslySetInnerHTML={{ __html: parsedContent }}
                        className="prose max-w-4xl font-work-sans break-all"
                      />
                    ) : (
                        <p className="no-results">No details provided</p>
                    )}
                </div>
                <div className="absolute bottom-4">
                  <Suspense fallback={<Skeleton className="w-full h-[100px]"/>}>
                      <View id={id}/>
                  </Suspense>
                </div>
                <hr className="divider"/>

                {
                    editorPicks && editorPicks.select.length > 0 && (
                        <div className="max-w-4xl mx-auto">
                            <p>Editor Picks</p>
                            <ul className="mt-7 card_grid-sm">
                                {editorPicks.select.map((pick: StartupTypeCard, index: number) => (
                                    <StartupCard key={index} post={pick} />
                                ))}
                            </ul>
                        </div>
                    )}

                <Suspense fallback={<Skeleton className="view_skeleton"  />}>
                    <Skeleton />
                </Suspense>
            </section>
        </main>
    )
}


export default Page
