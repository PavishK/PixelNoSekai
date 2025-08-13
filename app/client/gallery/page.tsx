"use client";

import {
    PlusCircle
} from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { AnimatePresence } from 'framer-motion';
import Spinner from "@/components/Spinner";
import UploadImage from '@/components/UploadImage';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import ListImages from '@/components/ListImages';
import Image from 'next/image';

interface uploadSchema{
  file:File | null;
  note:string;
}

interface GallerySchema{
  id: number;
  imageUrl: string;
  note: string;
  userEmail: string;
  image_name: string;
  image_size: string;
  createdAt: string;
}

export default function Gallery() {

    const {data:session,status} = useSession();

    const [viewPopup,setViewPopup]=useState(false);

    const [gallery,setGallery]=useState<[GallerySchema] | []>([]);

    const [makeLoading,setMakeLoading]=useState(false);

    const convertToBase64 = (file: File | any): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          resolve(reader.result as string);
        };

        reader.onerror = () => {
          reject("Error converting to base64");
        };
      });
    };


    const uploadGalleryData=async(data:uploadSchema)=>{

      if(!session){
        toast.error("Please continue with Google!");
        return;
      }

      setMakeLoading(true);
      try {
        const base64= await convertToBase64(data?.file);
        const fileData={
          image:base64,
          note:data.note,
          email:session?.user?.email,
          image_name:data?.file?.name,
          image_size:data?.file?.size,
        };

        const res=await axios.post('/api/gallery',fileData);
        console.log(res.data);
        const newData:[GallerySchema]=[...gallery,res.data.data];
        setGallery([...newData])
        
      } catch (error) {
        toast.error("Error while uploading!");
      } finally {
        setViewPopup(false);
        setMakeLoading(false);
      }
    }

    const fetchGallery=async()=>{
      setMakeLoading(true);
      try {
        const res= await axios.get(`/api/gallery/${session?.user?.email}`);
        setGallery(res.data.data);
      } catch (error) {
        toast.error("Server error x_x!");
      } finally {
        setMakeLoading(false);
      }
    }

    const deleteGalleryData=async(id:number)=>{
      setMakeLoading(true);
      try {
        await axios.delete(`/api/gallery/${session?.user?.email}/${id}`);
        toast.success("Image deleted successfully!");
      } catch (error) {
        toast.error("Unable to delete the image!");
      } finally {
        setMakeLoading(false);
      }
    }

    useEffect(()=>{
      if(status==="authenticated" && session.user?.email){
        fetchGallery();
      }
    },[status])

    if(!session){
      return (
        <div className='h-screen w-screen flex items-center justify-center bg-white/70'>
          <div className='flex items-center justify-center flex-col gap-y-6 border-2 p-4 rounded-lg bg-[#A5D6A7] border-[#2E7D32]'>
          <span className='text-2xl font-medium text-mentxt'>Please sign in to continue.</span>
          <button className='cursor-pointer hover:bg-blue-500 hover:scale-95 hover:text-white transition-colors flex items-center justify-normal gap-x-1 font-medium bg-white p-2 rounded-lg'
          onClick={()=>signIn('google')}
          >
            <Image src={"/google.png"} alt='Google' width={30} height={30}/>
            Continue with Google
          </button>
          </div>
        </div>
      )
    }

    return (
        <>
        <div className="text-xl flex items-start justify-start h-screen w-full">
          <AnimatePresence>
            {gallery.length>0 && <ListImages galleryData={gallery} rmData={(id)=>deleteGalleryData(id)} key={0}/>}
            {viewPopup && <UploadImage closePopup={()=>setViewPopup(false)} galleryData={(data)=>uploadGalleryData(data)} key={1}/>}
            {makeLoading && <Spinner key={2}/>}
          </AnimatePresence>
        </div>


       {!viewPopup && 
        (<div className='group z-[1000] fixed bottom-5 right-5 flex items-center justify-center flex-row gap-x-2 bg-menu rounded-2xl text-white p-2 cursor-pointer'
        onClick={()=>setViewPopup(true)}
        >
            <PlusCircle size={40} className='text-menico'/>
            <p className='text-lg sm:hidden group-hover:block text-mentxt font-bold'>Upload image</p>
        </div>)
        }
        </>
    );
}