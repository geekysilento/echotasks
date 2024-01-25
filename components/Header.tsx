"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";
import useAuthStore from "@/store/AuthStore";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);
  const username = useAuthStore((state) => state.username)
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");
  // useEffect(() => {
  //     if (board.columns.size === 0) return;
  //     setLoading(true);

  //     const fetchSuggestionFunc = async () => {
  //         const suggestion = await fetchSuggestion(board);
  //         setSuggestion(suggestion);
  //         setLoading(false);
  //     }
  //     fetchSuggestionFunc();
  // }, [board])

  const generateGptSummary = async () => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const suggestion = await fetchSuggestion(board);
    setSuggestion(suggestion);
    setLoading(false);
  };

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-slate-500/10 rounded-b-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-green-300 to-purple-400 rounded-md filter blur-3xl opacity-80   -z-50">
          {/* hidden gradient global div */}
        </div>

        <Image
          src="/echotasks.png"
          alt="todo logo"
          width={300}
          height={300}
          className="w-60 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          <form className="flex items-center space-x-1 bg-white rounded-xl p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="w-7 h-7 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2 "
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>
          <Avatar name={username} round color="teal" size="50" />
        </div>
      </div>
      <div className="flex items-center justify-center px-5 py-5">
        <button
          onClick={generateGptSummary}
          className="flex items-center text-sm text-white bg-teal-500 border border-teal-500 rounded-xl p-2 hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-700"
        >
          <UserCircleIcon
            className={`h-10 w-10 mr-1 inline-block text-white ${loading && "animate-spin"
              }`}
          />
          Generate Summary
        </button>
        <p className="flex items-center text-sm text-teal-500 pr-5 py-4 shadow-xl rounded-xl w-fit bg-white max-w-3xl font-medium p-2">
          {suggestion && !loading
            ? suggestion
            : "GPT is summarizing your tasks for the day."}
        </p>
      </div>
    </header>
  );
}

export default Header;
