import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from '@/lib/prisma';

function convertIntoMB(no:number):string{
  const MB=1048576;
  return (no/MB).toFixed(2);
}

export async function POST(req: Request) {
  try {
    const { image, note, email, image_name, image_size } = await req.json();

    //Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "pixel_no_sekai",
    });

    const data=await prisma.gallery.create({
      data:{
        userEmail:email,
        imageUrl:uploadResponse.secure_url,
        note:note,
        image_name,
        image_size:convertIntoMB(image_size),
      }
    });

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        data
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}
