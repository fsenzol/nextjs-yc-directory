import React from 'react'
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import StartupForm from "@/components/StartupForm";

const Page = async () => {

    const session = await auth();

    if (!session) {
        redirect("/");
    }

    return (
        <main>
            <section className="pink_container min-h-[230px]">
                <h1 className="heading">Submit Your Startup</h1>
            </section>

            <StartupForm/>
        </main>
    )
}
export default Page
