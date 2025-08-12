import NavBar from "@/components/NavBar";
import React from "react";

export default function ClinetLayout({children}:{children:React.ReactNode}) {
    return (
        <>
        <NavBar/>
        <div className="size-full bg-base">
        {children}
        </div> 
        </>
    );
}