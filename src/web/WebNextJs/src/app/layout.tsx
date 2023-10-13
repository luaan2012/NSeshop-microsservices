import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Nav, Toaster } from "@/components";
import Providers, { ReduxProvider } from "./Providers";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "/images/icons/favicon.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`dark:bg-zinc-800 ${inter.className}`}>
        <Providers>
          <ReduxProvider>
            <Nav />
            {children}
          </ReduxProvider>
          <Footer />
        </Providers>
        <Toaster />
        <ToastContainer />
      </body>
    </html>
  );
}
