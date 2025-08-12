import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkValidUser } from "./checkValidUser";

interface ParamsSchema{
    params:{emailID:string}
}

export async function GET(req:Request,{ params }:ParamsSchema) {
  try {
    const { emailID } = await params;
    if(!emailID){
        return NextResponse.json({message:"Missing data!"},{status:401});
    }

    if(await checkValidUser(emailID)){
        const gallery= await prisma.gallery.findMany({
            where:{
                userEmail:emailID,
            },
        });
        return NextResponse.json({message:"Gallery fetched!",data:gallery},{status:200});
    }

    return NextResponse.json({message:"Access denied!"},{status:401});
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({message:"Internal server error!"},{status:500});
  }
}