"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from '@/Components/Footer';
import Landing from '@/Components/Landing';
import Navbar from '@/Components/Navbar';


export default function Home() {

  const router = useRouter();

  const handleCompare = (repos) => {
    localStorage.setItem("repos", JSON.stringify(repos));
    router.push("/result");
  };
  
  return (
    <main className="flex flex-col min-h-screen"
    style={{ fontFamily: "Space Grotesk" }}>
      <Navbar />
      <div className="flex-grow">
      <Landing onCompare={handleCompare} />
      </div>
      <Footer />
    </main>
  );
}
