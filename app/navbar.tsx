"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname()
    return (
        <header className="px-5 py-3 lg:flex justify-between items-center">
            <div className="">
                <h1 className="font-semibold text-blue-500 text-xl">Datasintesa</h1>
                <p className="text-slate-500">Hasil teknikal test Fullstack Developer - Zulfahmi</p>
            </div>
            <div className="flex items-center gap-3 mt-3 lg:mt-0">
                <Link
                    href={"/"}
                    className={
                        pathname == "/" ? 
                        "py-2 px-3 rounded-lg bg-blue-500 text-white font-semibold  cursor-pointer" :
                        "py-2 px-3 rounded-lg bg-slate-100 text-blue-500 cursor-pointer"
                    }>
                    Graph
                </Link>
                <Link
                    href={"/upload"}
                    className={
                        pathname == "/upload" ? 
                        "py-2 px-3 rounded-lg bg-blue-500 text-white font-semibold  cursor-pointer" :
                        "py-2 px-3 rounded-lg bg-slate-100 text-blue-500 cursor-pointer"
                    }>
                    Upload
                </Link>
            </div>
        </header>
    )
}