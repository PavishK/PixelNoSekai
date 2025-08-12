"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Client() {
  const router = useRouter();
  const [quote, setQuote] = useState({ quote: "", character: "", anime: "" });
  const [makeLoading, setMakeLoading] = useState(false);

  const getRandomQuote = async () => {
    setMakeLoading(true);
    try {
      const res = await axios.get("/api/quote");
      setQuote(res.data.data);
    } catch (error) {
      toast.error("Server error x_x!");
    } finally {
      setTimeout(() => router.replace("/client/home"), 3000);
      setMakeLoading(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#f8f9fa] text-center px-4 font-mono">
      {!makeLoading && (
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-relaxed animate-fadeIn">
            “{quote.quote}”
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-2 animate-fadeIn delay-200">
            — <span className="font-semibold">{quote.character}</span> from{" "}
            <span className="italic">{quote.anime}</span>
          </p>

          <div className="flex items-center justify-center mt-8 space-x-3 border-t pt-6 animate-fadeIn delay-500">
            <div className="w-6 h-6 border-4 border-mentxt border-b-transparent rounded-full animate-spin" />
            <h2 className="text-gray-600 text-sm">
              You will be redirected to <u className="text-mentxt">PixelNoSekai/Clinet/Home</u>
            </h2>
          </div>
        </div>
      )}

      {makeLoading && <Spinner />}
    </div>
  );
}
