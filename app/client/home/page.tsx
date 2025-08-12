"use client";
import Image from "next/image";
import {motion, AnimatePresence } from 'framer-motion';

export default function Home() {
    
    return (
        <AnimatePresence>
        <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.6}}
        className="text-xl flex items-center justify-center gap-x-2 flex-col-reverse gap-y-4 sm:flex-row h-screen w-screen p-8">
            <motion.div 
            initial={{x:-100}}
            animate={{x:0}}
            exit={{x:100}}
            transition={{duration:1}}
            className="flex-1/2 flex items-start justify-normal h-fit flex-col gap-y-8">
                <h1 className="text-2xl sm:text-3xl text-head font-semibold">PixelNoSekai — Your Personal Pixel Gallery</h1>
                <p className="text-para text-lg font-mediu overflow-x-auto">Welcome to PixelNoSekai, a beautifully crafted space where you can store, showcase, and cherish your favorite images. </p>
                </motion.div>
            <motion.div 
            initial={{y:-100}}
            animate={{y:0}}
            exit={{y:100}}
            transition={{duration:1}}
            className="flex-1/2 flex items-center justify-center w-full h-fit border-2 border-mentxt rounded-lg">
            <Image src={"/pns-home.jpg"} priority alt="Logo Home" width={200} height={200} className="w-full h-full sm:h-fit clip-image"/>
            </motion.div>

        </motion.div>
        </AnimatePresence>
    );
}