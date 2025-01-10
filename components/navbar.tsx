import React from 'react'
import {auth, signIn, signOut} from "@/auth";
import Link from "next/link";
import Image from "next/image";
import logo from '../public/logo.png'
import {BadgePlus, LogOut} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const Navbar = async () => {
    const session = await auth()

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between gap-5 text-black">
                <Link href="/">
                    <Image src={logo} alt="logo" width={144} height={30}/>
                </Link>

                <div className="flex items-center gap-5">
                    {session && session?.user ? (
                        <>

                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="sm:hidden size-8"/>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut()
                            }}>
                                <button type="submit">
                                    <p className="max-sm:hidden">Logout</p>
                                    <LogOut className="size-6 sm:hidden stroke-red-500"/>
                                </button>

                            </form>

                            <Link href={`/users/${session?.id}`}>
                              <Avatar className="size-10">
                                  <AvatarImage src={session?.user?.image || ""}
                                               alt={session?.user?.name}
                                  />
                                  <AvatarFallback>AV</AvatarFallback>
                              </Avatar>
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
