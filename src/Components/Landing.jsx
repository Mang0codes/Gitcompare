import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { getRepoData } from "@/app/actions";
import { FaGithub, FaRegStar, FaCodeBranch, FaBug, FaUsers } from "react-icons/fa";
import { VscRepo } from "react-icons/vsc";
import { TbPackage } from "react-icons/tb";
import { MdOutlineLanguage } from "react-icons/md";

const Landing = ({ onCompare }) => {
  const [repos, setRepos] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    const fetchRepos = async () => {
      try {
        const res = await axios.get(
          `https://api.github.com/search/repositories?q=${input}+in:name&per_page=5`
        );
        setSuggestions(res.data.items || []);
      } catch (err) {
        console.error(err);
      }
    };

    const timeout = setTimeout(() => {
      fetchRepos();
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [input]);

const handleAddRepo = async () => {
    if (!input.trim()) return;
    if (repos.some((repo) => repo.name === input.trim())) {
    setInput("");
    return;
    }
    const repoData = await getRepoData(input.trim());
    if (repoData) {
      setRepos([...repos, repoData]);
    }
    setInput("");
  };

  const handleDeleteRepo = (repoToDelete) => {
    setRepos(repos.filter((repo) => repo !== repoToDelete));
  };


  return (
    <div className='mt-20'>
      <div className='flex flex-col items-center'>
        <label className='my-2 font-bold text-lg' >Search for a repository</label>
        <div className='flex items-center justify-between border-3 bg-[#C5A1FF] border-black w-80 h-10 my-1 relative'>
          <input placeholder='eg. Vercel/Next.js'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='border-r-3 w-full h-10 px-2 focus:outline-none focus:border-2 focus:bg-white'
          >
        </input>
        <div className='w-10 h-10 m-2 flex items-center justify-center'>
          <button
          onClick={handleAddRepo}
          type="button"
          className='font-medium text-4xl cursor-pointer'>+</button>
        </div>

        {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10 max-h-60 overflow-y-auto rounded-b-md shadow-md">
          {suggestions.map((repo) => (
            <li
              key={repo.id}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer flex justify-between items-center"
              onClick={async () => {
              const repoFullName = repo.full_name;
              // Prevent adding duplicates
              if (repos.some((r) => r.name === repoFullName)) return;
              
              const repoData = await getRepoData(repoFullName);
              if (repoData) {
                setRepos([...repos, repoData]);
              }
              setInput("");
              setSuggestions([]);
            }}
            >
              {repo.full_name}
            </li>
          ))}
        </ul>
      )}


        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-1 mt-10 gap-10 items-center lg:grid-cols-3'>

        {repos.map((repo) => (
        <div key={repo.name}
        className='border-3 border-black shadow-[5px_5px_0px_black] h-64 w-76 bg-[#BAE6FF]'>
          <div className='m-6 font-medium border-black mt-8'>
          <div className="flex items-center gap-2"><FaGithub />   <span className="truncate max-w-[12rem]">{repo.name.split("/")[1]}</span></div>
          <div className="flex items-center gap-2"><FaRegStar /> Stars: {repo.stars.toLocaleString()}</div>
          <div className="flex items-center gap-2"><TbPackage /> Size: {repo.size.toLocaleString()}</div>
          <div className="flex items-center gap-2"><FaCodeBranch /> Forks: {repo.forks.toLocaleString()}</div>
          <div className="flex items-center gap-2"><FaBug /> Open Issues: {repo.issues.toLocaleString()}</div>
          <div className="flex items-center gap-2"><FaUsers /> Contributors: {repo.contributors.toLocaleString()}</div>
          <div className="flex items-center gap-2"><MdOutlineLanguage /> Language: {repo.language}</div>

          <div className="flex justify-end items-center w-full h-8 rounded-2xl">
            <button className=' cursor-pointer' 
                    onClick={() => handleDeleteRepo(repo)}>
              <img src="/imgs/bin.png" alt="delete" className="w-8 h-8" />
            </button>
          </div>
          </div>
        </div>
        ))
        }

      </div>
      </div>
      {repos.length > 0 && (
      <div className='flex items-center justify-center mt-10'>
      <button onClick={() => onCompare(repos)}
      className='bg-[#FFDC58] w-40 h-12 border-3 active:shadow-[5px_5px_0px_black]'>Compare</button>
      </div>
      )}
    </div>
  )
}

export default Landing

// name: repoFullName,
//       size: repoData.size || 0,
//       stars: repoData.stargazers_count || 0,
//       forks: repoData.forks_count || 0,
//       issues: repoData.open_issues_count || 0,
//       contributors: contribCount || 0,