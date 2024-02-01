import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Criação do Projeto EzMoney",
  description: "Projeto react.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={clsx(inter.className, "flex flex-col h-screen")}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
