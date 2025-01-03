import React from 'react'
import {auth, signIn, signOut} from "@/auth";
import Link from "next/link";
import Image from "next/image";
import logo from '../public/logo.png'


const Navbar = async () => {
    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between gap-5 text-black">
                <Link href="/public">
                    <Image src={logo} alt="logo" width={144} height={30}/>
                </Link>

                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        <>

                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut()
                            }}>
                                <button type="submit">Logout</button>
                            </form>

                            <Link href={`/users/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>

                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn()
                        }}>
                            <button type="submit">SignIn</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}
export default Navbar
