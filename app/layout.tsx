import type { Metadata } from "next";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "react-hot-toast";
import "./globals.css";


export const metadata: Metadata = {
  title: "PixelNoSekai",
  description: "An gallery website build to save images 🥃.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionWrapper>
          {children}
          <Toaster position="bottom-center" toastOptions={{duration:3000}}/>
        </SessionWrapper>
      </body>
    </html>
  );
}
