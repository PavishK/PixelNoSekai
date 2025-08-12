import { motion } from "framer-motion";
import { CloudUpload, ImageUp, TrashIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface uploadSchema{
  file:File | null;
  note:string;
};

interface UploadImageSchema{
  closePopup:()=>void;
  galleryData:(arg0:uploadSchema)=>void;
}

export default function UploadImage({closePopup, galleryData}:UploadImageSchema) {

  const InputFileRef=useRef<HTMLInputElement>(null);
  const [previewImage,setPreviewImage]=useState<string | null> (null);
  const [file,setFile]=useState<File | null>(null);
  const [note,setNote]=useState("");

  const onClickUploadImage=()=>{
    InputFileRef?.current?.click();
  }

  const onDeleteSelectedImage=()=>{
    setPreviewImage(null);
    setFile(null);
  }

  const showPreviewImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target?.files?.[0];
    const maxMB= 2 * 1024 * 1024;
    if(file!==undefined){
      if(file.size>maxMB){
        toast.error("Image size exceeds 2MB");
        setPreviewImage(null);
        return;
      }
      const tempurl=URL.createObjectURL(file);
      setPreviewImage(tempurl);
      setFile(file);
    } else {
      toast.error("Please select an Image!");
      return;
    }

  }

  const onClickSaveBtn=()=>{

    if(!file){
      toast.error("Please select an Image");
      return;
    }

    if(!note.trim()){
      toast.error("Please add a note");
      return;
    }

    galleryData({file,note})
  }

  return (
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.4}}
    className="fixed z-[1000] flex items-center justify-center h-screen w-screen bg-white/70 cursor-auto">

    <input type="file" accept="image/*" ref={InputFileRef} className="hidden"
    onChange={showPreviewImage}
    />

      <div className="relative sm:w-80 w-full mx-8 h-fit bg-white border-2 rounded-lg border-[#2E7D32] py-3 px-1">
        <XIcon size={28} className="absolute right-0 top-0 text-menico cursor-pointer hover:scale-105" onClick={closePopup}/>

        <div className="w-full h-full flex items-center justify-center flex-col gap-y-3 px-6">

          {!previewImage?
          (<div className="border-2 border-dashed rounded-lg hover:bg-green-100 cursor-pointer border-[#2E7D32] w-full h-36 flex items-center flex-col gap-y-2 justify-center"
          onClick={onClickUploadImage}
          >
            <ImageUp size={60} className="text-menico"/>
            <span className="text-mentxt text-center text-sm px-2">Click here to select image</span>
          </div>):(
            <div className=" relative border-2 border-dashed rounded-lg hover:bg-green-100 cursor-pointer border-[#2E7D32] w-full h-36"
            onClick={onClickUploadImage}
            >
              <Image src={previewImage} alt="Preview" width={200} height={200} 
              className="object-contain w-full h-full rounded-lg"
              />
            <TrashIcon size={30} className="z-[1000] absolute bg-red-500 p-1 rounded-sm right-0  top-0 m-2 text-white"
            onClick={onDeleteSelectedImage}
            />
            </div>
          )}

          <div className="bg-menu w-full h-32 rounded-lg p-2">
            <textarea name="note" value={note} placeholder="Add a note..." className="bg-white w-full h-full resize-none rounded-lg p-2 text-lg focus:outline-0"
            onChange={(e)=>setNote(e.target.value)}
            />
          </div>

          <button className="flex items-center cursor-pointer hover:scale-105 hover:bg-btntxt justify-center gap-x-1 font-bold bg-btn w-full p-1 rounded-lg"
          onClick={onClickSaveBtn}
          >
            <CloudUpload size={28}/>
            Save
          </button>

        </div>

      </div>
    </motion.div>
  );
}