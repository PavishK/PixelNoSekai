"use client";
import '@/app/globals.css';
import { Container,
    MoreVerticalIcon,
    HomeIcon,
    GalleryVerticalEndIcon,
    LinkIcon,
    XIcon
 } from 'lucide-react';
import Image from 'next/image';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { redirect, usePathname } from 'next/navigation';
import Logo from '../app/icon.ico';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const pathNames=[
    {name:"Home", path:"/client/home"},
    {name:"Gallery", path:"/client/gallery"}
]

const onClickLink=()=>{
    window.open("https://personal-portfolio-rdxc.onrender.com", "_blank", "width=900,height=800")
}

export default function NavBar() {

  const path=usePathname();
  const { data:session, status}=useSession();
  const [toggleMenu,setToggleMenu]=useState(false);
  const [toggleGoogle,setToggleGoogle]=useState(false);
  const [stored,setStored]=useState(false);


  const storeUserData=async()=>{
    try {
        const res=await axios.post("/api/user",session?.user);
        toast.success(res.data.message);
    } catch (error) {
        toast.error("Server error *_!");
        redirect("/");
    }
  }

  useEffect(()=>{

    setToggleMenu(false);
    setToggleGoogle(false);
  },[ path , status ]);

  useEffect(()=>{
    if (status === "authenticated" && session?.user && !stored) {
        storeUserData();
        setStored(true);
    }
  },[status])

    return (
        <>

        <div className="flex items-center justify-between w-full px-2 py-5">
            <div className='flex items-center justify-normal gap-x-2 font-semibold'>
                <Image src={Logo} alt='Logo' width={25} height={25} className='w-7 h-7'/>
                <h1 className='text-lg sm:text-2xl bg-gradient-to-tr from-base via-mentxt to-menico bg-clip-text text-transparent'>PixelNoSekai</h1>
            </div>

            <div className='w-fit'>
                <ul className='flex items-center justify-normal gap-x-3 sm:gap-x-6.5 text-lg'>
                    <li className={`sm:block sm:cursor-pointer hidden underline-offset-4 decoration-menhov
                        ${path===pathNames[0].path && 'underline decoration-2'}
                        `}>
                        <Link href={"/client/home"}>Home</Link></li>
                    <li className={`sm:block sm:cursor-pointer hidden underline-offset-4 decoration-menhov
                        ${path===pathNames[1].path && 'underline decoration-2'}
                        `}>
                        <Link href={"/client/gallery"}>Gallery</Link></li>
                    <li className={`sm:block sm:cursor-pointer hidden text-menico`} title='About devloper'>
                        <LinkIcon size={23} onClick={onClickLink}/></li>
                    <li className='sm:hidden cursor-pointer block'>
                        <MoreVerticalIcon onClick={()=>setToggleMenu(prev=>!prev)}/></li>
                    <li>
                        {session?(
                        <Image src={session?.user?.image || "/google.png"} alt={session.user?.name || "user name"} width={46} height={46} className='rounded-full object-cover border border-menico cursor-pointer p-0.5' 
                        onClick={()=>setToggleGoogle(prev=>!prev)}
                        />
                        ):(
                        <button className='flex items-center justify-normal gap-x-1 text-xs border p-2 rounded-xl transition-colors hover:bg-blue-500 cursor-pointer hover:text-white'
                        onClick={()=>signIn('google')}
                        >
                            <Image src="/google.png" alt='G+' width={20} height={20}/>
                            <span>{"Continue with Google"}</span>
                        </button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
        <AnimatePresence>
        {toggleMenu && <MenuBar/>}
        {toggleGoogle && <ProfileMenu userData={session?.user} closeMenu={()=>setToggleGoogle(false)}/>}
        </AnimatePresence>
        </>
    );
}

function MenuBar(){

    const path=usePathname();

    return (
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.3}}
        className='absolute z-[99999] sm:hidden top-14 right-20 flex items-center justify-center w-40 px-1 py-2 text-lg font-medium rounded-lg bg-[#A5D6A7] border-[#2E7D32] border-2'>
            <ul className='flex items-start flex-col gap-y-3 text-mentxt'>
                <li className='flex items-center justify-normal gap-x-2 hover:underline cursor-pointer hover:text-menhov'>
                    <HomeIcon className='text-menico'/>
                    <Link href={"/client/home"} className={`${path===pathNames[0].path && 'font-bold'}`}>Home</Link>
                    </li>
                <li className='flex items-center justify-normal gap-x-2 hover:underline cursor-pointer hover:text-menhov'>
                    <GalleryVerticalEndIcon className='text-menico'/>
                    <Link href={"/client/gallery"} className={`${path===pathNames[1].path && 'font-bold'}`}>Gallery</Link>
                    </li>
                <li className='flex items-center justify-center pt-2 border-t-[#2E7D32] border-t-2 w-full'>
                    <LinkIcon className='text-menico' onClick={onClickLink}/></li>
            </ul>
        </motion.div>
    );
}

function ProfileMenu({userData, closeMenu}){
    return(
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.3}}
        className='absolute z-[99999] top-0 right-0 flex items-center flex-col m-0.5 p-4 gap-y-5 justify-center w-64 rounded-lg bg-black/80'>
            <h1 className='text-3xl text-white'>Google</h1>
            <div className='flex items-start w-full justify-start gap-x-1.5'>
                <Image src={Logo} alt={userData?.name} width={50} height={50} className=' w-10 h-10 rounded-full border border-white object-contain'/>
                <div className='leading-4 text-white'>
                    <h3 className='font-medium capitalize'>{userData?.name}</h3>
                    <h3 className='text-sm'>{userData?.email}</h3>
                </div>
            </div>
            <div className='w-full border border-white self-center rounded-xl text-white text-center font-semibold p-1 hover:bg-white hover:text-black cursor-pointer'
            onClick={()=>signOut()}
            >
                Sign out
            </div>
            <XIcon size={25} className='cursor-pointer absolute text-white top-0 right-0 m-2' onClick={closeMenu}/>
        </motion.div>
    )
}