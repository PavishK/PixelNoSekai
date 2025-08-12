"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";

export default function Spinner() {

    return (
    <AnimatePresence>
        <motion.div
        initial={{opacity:0.2}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration:0.8}}
        className="fixed h-screen z-[9999] w-screen flex cursor-auto items-center justify-center bg-white/70">
            <div className="flex items-center justify-center flex-col leading-0">
                <Image draggable="false" priority unoptimized src={"/loader.gif"} alt="Loading..." width={150} height={150} className="animate-bounce"/>
                <span className="text-lg font-medium font-mono -mt-8 animate-pulse">Loading...</span>
            </div>
        </motion.div>
    </AnimatePresence>
    );
}