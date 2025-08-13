"use clinet";

import Image from 'next/image';
import { motion } from 'framer-motion';
import './Styles.css';
import { DownloadIcon, EyeClosedIcon, EyeIcon, MoreHorizontal, MoreVertical, Trash2Icon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GalleryDataSchema {
    id: number,
    imageUrl: string,
    note: string,
    userEmail: string,
    image_name: string,
    image_size: string,
    createdAt: string,
}

interface GallerySchema {
    
    galleryData:[] | [GalleryDataSchema],

    rmData:(arg0:number)=>void;
}

export default function ListImages({galleryData, rmData}:GallerySchema) {

    const [gallery,setGallery]=useState([{id:0,imageUrl:'',note:'',userEmail:'',image_name:'',image_size:'',createdAt:''}]);
    const [clickIndex,setClickIndex]=useState<number>(-1);
    const [noteView,setNoteView]=useState(true);
    const [noteViewIndex,setNoteViewIndex]=useState<number>(-1);

    const toggleViewNote=()=>{
        setNoteView(prev=>!prev);
    }

    const onDeleteGaleryData=(id:number)=>{
        rmData(id);
        setGallery(gallery.filter(item=>item.id!=id));
        setClickIndex(-1);
    }

    const getFileType=(file:string):string | undefined=>{
        return file.split('.').at(-1);
    }

    const formatDate=(txt:string):string=>{
        const date=new Date(txt);

        const mm= String(date.getMonth()+1).padStart(2,'0');
        const dd= String(date.getDate()).padStart(2,'0')
        const yyyy= date.getFullYear();

        return`${mm}/${dd}/${yyyy}`;
    }

    useEffect(()=>{
        setGallery(galleryData);
    },[])

    if(gallery.length<=0){
        return(
            <div className='w-full h-full flex items-center justify-center text-center font-medium text-mentxt'>
                {"“Your gallery feels lonely... give it some memories to smile about!”"}
            </div>
        )
    }
    else{
        return (
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.5}}
            className="hide-scrollbar flex items-center justify-center p-3 flex-wrap-reverse flex-row-reverse gap-3 w-full h-[88vh] overflow-auto">
                {gallery.map((val,i)=>(
                <div className=" relative w-72 h-96 bg-white rounded-lg flex items-center justify-start flex-col group " key={i}>
                    <Image src={val.imageUrl} alt='something' width={150} height={150}
                    className='w-full flex-1/2 object-cover bg-white/80 rounded-t-lg'
                    />
                <div>
                    
                </div>
                    <div className=' w-full bg-[#1C5E3F] flex-1/8 p-3 text-lg h-full rounded-b-lg flex items-start justify-normal flex-col gap-y-1.5 text-white'>
                        <div className='flex items-center justify-between w-full'>
                        <p className='w-60 line-clamp-1'>{val.image_name}</p>
                        <span className='text-sm font-medium border-2 font-mono p-1 uppercase rounded-lg'>{getFileType(val.image_name)}</span>
                        </div>
                        <p className='font-normal font-mono'>{formatDate(val.createdAt)}</p>
                        <span className='text-sm uppercase text-[#FFCB27]/90 font-bold border-2 border-[#FFCB27] rounded-xl p-1'>{val.image_size} mb</span> 
                    </div>

                    <MoreVertical size={30} className=' z-[999] sm:hidden sm:group-hover:block absolute top-0 right-0 bg-[#1C5E3F] p-1 text-white rounded-lg cursor-pointer hover:scale-105'
                    onClick={()=>{setClickIndex(i); setNoteViewIndex(i)}}
                    />

                    {noteView || noteViewIndex===i && <div 
                    className='h-full absolute flex items-center justify-center w-full transition-all ease-in-out duration-500 text-lg text-wrap cursor-pointer'>
                        <div className='bg-white/80 w-full h-32 px-2 overflow-y-auto'>
                        {val.note}
                        </div>
                    </div>}

                    {clickIndex===i &&
                    (<motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:0.4}}
                    className='z-[1000] absolute top-0 right-0 w-40 h-fit bg-[#A5D6A7] border-[#2E7D32] border-2 rounded-tr-lg  rounded-bl-lg'>
                    <div className='relative flex items-start p-3 justify-center flex-col gap-y-1 w-full h-full text-lg text-mentxt font-medium'>
                        {noteView && clickIndex===i?
                        (<span className='flex items-center justify-center gap-x-1 cursor-pointer'
                        onClick={()=>toggleViewNote()}
                        >
                            <EyeIcon size={20}/> View note
                        </span>):
                        (<span className='flex items-center justify-center gap-x-1 cursor-pointer'
                        onClick={()=>toggleViewNote()}
                        >
                            <EyeClosedIcon size={20}/> Hide note
                        </span>)}
                        <span className='flex items-center justify-center gap-x-1'>
                            <DownloadIcon size={20}/> 
                            <a className='cursor-pointer' href={val.imageUrl} download={val.image_name}>Download</a>
                        </span>
                        <span className='flex items-center justify-center cursor-pointer gap-x-1'>
                            <Trash2Icon size={20}/> 
                            <span onClick={()=>onDeleteGaleryData(val.id)}>Delete</span>
                        </span>
                        <XIcon size={28} className='absolute top-0 right-0 cursor-pointer' onClick={()=>setClickIndex(-1)}/>
                    </div>
                    </motion.div>)
                    }

                </div>
                ))}
            </motion.div>
        );
    }
}