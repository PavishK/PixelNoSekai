import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkValidUser } from "../checkValidUser";

interface ParamsSchema{
    params:{
        emailID:string,
        imageId:number,
    }
}

export async function DELETE(req:Request,{params}:ParamsSchema) {
    try {
        const {emailID, imageId}=await params;

        if(await checkValidUser(emailID)){
            await prisma.gallery.delete({
                where:{
                    id:Number(imageId),
                },
            });
            return NextResponse.json({message:"Gallery data deleted successfully!"},{status:200});
        }
        return NextResponse.json({message:"Access denied!"},{status:401});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Internal server error!"},{status:500});
    }
}