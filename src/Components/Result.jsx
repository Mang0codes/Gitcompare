"use client";

import React from 'react'
import rankRepos from "@/utils/rankedRepos";
import { FaGithub, FaRegStar, FaCodeBranch, FaBug, FaUsers } from "react-icons/fa";
import { VscRepo } from "react-icons/vsc";
import { TbPackage } from "react-icons/tb";
import { MdOutlineLanguage } from "react-icons/md";


export default function Result({ rankedRepos }) {
  const ranked = rankRepos(rankedRepos).slice(0, 3);

  const podium = [
    { color: "#FFDC58", height: "h-72", textSize: "sm:text-2xl" },
    { color: "#C5A1FF", height: "h-96", textSize: "sm:text-4xl" },
    { color: "#BAE6FF", height: "h-80", textSize: "sm:text-3xl" },
  ];

  let slotsToRender = [];
  if (ranked.length === 1) {
    slotsToRender = [podium[1]];
  } else if (ranked.length === 2) {
    slotsToRender = [podium[1], podium[2]]; 
  } else {
    slotsToRender = podium; 
  }

  return (

<div className="flex items-center justify-center mt-20 w-full px-1 sm:px-0 overflow-x-hidden">
  <div className="flex items-end justify-center gap-2 scale-75 w-full sm:scale-100">

    {slotsToRender.map((p, i) => {
      const repo = ranked[i];
      if (!repo) return null;

      return (
        <div
          key={`${repo.name}-${i}`}
          className={`w-42 sm:w-65 ${p.height} border-2 sm:border-3 shadow-[3px_3px_0px_black] sm:shadow-[5px_5px_0px_black] rounded-lg flex items-center justify-center`}
          style={{ backgroundColor: p.color }}
        >
          <div className="m-2 space-y-2 sm:mx-6 font-medium text-sm sm:text-base">
             <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer gap-2 flex items-center justify-center font-extrabold text-center mb-6 hover:underline text-xl ${p.textSize} `}
            >
              <FaGithub />
              {repo.name.split("/")[1]}
            </a>
            <div className="flex items-center gap-2"><TbPackage /> Size: {repo.size.toLocaleString()}</div>
            <div className="flex items-center gap-2"><FaRegStar /> Stars: {repo.stars.toLocaleString()}</div>
            <div className="flex items-center gap-2"><FaCodeBranch /> Forks: {repo.forks.toLocaleString()}</div>
            <div className="flex items-center gap-2"><FaBug /> Issues: {repo.issues.toLocaleString()}</div>
            <div className="flex items-center gap-2"><FaUsers /> Contributors: {repo.contributors.toLocaleString()}</div>
            <div className="flex items-center gap-2"><MdOutlineLanguage /> Language: {repo.language}</div>
          </div>
        </div>
      );
    })}
  </div>
</div>


  )
}
