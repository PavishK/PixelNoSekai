import { NextResponse } from "next/server";
import { randomQuote } from "./animeQuotes";

export async function GET(){
    try {
        return NextResponse.json({data:randomQuote()},{status:200});
    } catch (err) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}