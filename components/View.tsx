import React from 'react'
import Ping from "@/components/Ping";
import {client} from "@/sanity/lib/client";
import {STARTUP_ID_QUERY_VIEWS} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";
import { after } from 'next/server'

const View = async ({id} : {id : string}) => {
    const {views} = await client
        .withConfig({useCdn: false})
        .fetch(STARTUP_ID_QUERY_VIEWS, {id});


    after(async () => {
        await writeClient.patch(id).set({views: views >= 0 ? views + 1 : 0}).commit();
    });


    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">{views > 1 ? 'Views' : 'View'}: {views}</span>
            </p>
        </div>
    )
}
export default View
