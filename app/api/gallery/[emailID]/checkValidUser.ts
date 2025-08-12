import { prisma } from "@/lib/prisma";

export async function checkValidUser(email:string):Promise<boolean> {
    const existUser=await prisma.user.findUnique({
        where:{
            email,
        },
    });

    if(!existUser){
        return false;
    }
    return true;
}