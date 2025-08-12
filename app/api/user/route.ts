import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma';

export async function POST(req:Request) {
    try {
        const { name , email, image }=await req.json();
        if(!name || !email)
            return NextResponse.json({message:"Missing data!"},{status:401});
        const oldUser=await prisma.user.findUnique({
            where:{
                name,
                email,
            }
        });

        if(!oldUser){
            await prisma.user.create({
                data:{
                    name,
                    email,
                    image,
                }
            });
            return NextResponse.json({message:"Registered successfully!"},{status:201});
        }

        return NextResponse.json({message:"Login successfully!"},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}