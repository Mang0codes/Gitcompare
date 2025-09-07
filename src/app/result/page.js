"use client";
import { useEffect, useState } from "react";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import Result from "@/Components/Result";
import rankRepos from "@/utils/rankedRepos";

const ResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const repos = JSON.parse(localStorage.getItem("repos") || "[]");
    if (repos.length > 0) {
      setResults(rankRepos(repos));
    }
  }, []);

  return (
    <main className="flex flex-col min-h-screen" style={{ fontFamily: "Space Grotesk" }}>
      <Navbar />
      <div className="flex-grow">
        <Result rankedRepos={results} />
      </div>
      <Footer />
    </main>
  )
}

export default ResultPage