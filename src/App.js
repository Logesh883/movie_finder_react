import React, { useState, useEffect } from "react";
import "./App.css";
import icon from "./logo movie.png";

function App() {
  const url = "https://api.themoviedb.org/3/";
  const key = "api_key=8ff0c9574c86086fa9f5265668d8770b";
  const api_url =
    url +
    "/discover/movie?&original_language='e'&sort_by=popularity.desc&" +
    key;
  const img_url = "https://image.tmdb.org/t/p/w500/";
  const s_url = url + "/search/movie?" + key;

  // States
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const apiUrl = query ? s_url + "&query=" + query : api_url;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        setMovie(json.results);
      });
  }, [query, api_url, s_url]);
  const search = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  let colorFromVoteAverage = (e) => {
    if (e >= 8) return "bg-green-600";
    else if (e >= 6) return "bg-yellow-600";
    else if (e >= 5) return "bg-red-600";
  };

  return (
    <>
      <div className="bg-[#1D1A39]">
        <nav className="bg-pink-600 flex  justify-between fixed z-40 w-full  ">
          <div className="flex items-center ml-20 ">
            <img src={icon} className="w-[60px]" />
            <h1 className="uppercase font-bold text-xl bg-gradient-to-r from-[#C0EEE4] to-[#00FFD1] bg-clip-text text-transparent">
              Movie Finder
            </h1>
          </div>
          <form className="pt-[0.4rem] pr-20 ">
            <input
              type="text"
              onChange={search}
              className="w-[280px] h-[40px] bg-transparent border-2 p-3 border-cyan-400 rounded-lg focus:outline-none text-lg font-semibold text-gray-200"
              placeholder="Search here"
            />
          </form>
        </nav>

        <div className="flex flex-wrap  justify-evenly gap-x-2 p-2">
          {movie.map((value, index) => (
            <div
              key={index}
              className="w-[20%] border-2 mt-16 p-2 rounded-lg flex flex-col overflow-hidden relative divide-y-4 divide-red-300 group "
            >
              <img
                src={img_url + value.poster_path}
                className="rounded-lg"
                alt="movie"
              />
              <div className="flex justify-between mt-2 ">
                <p className="text-lg font-semibold text-slate-200 w-[70%] tracking-wide">
                  {value.title}
                </p>

                <p
                  className={`p-3 mt-2 rounded-lg text-lg font-semibold text-slate-200 tracking-wide  text-center w-[60px] ${colorFromVoteAverage(
                    value.vote_average
                  )}`}
                >
                  {value.vote_average}
                </p>
              </div>
              <div className="absolute  -top-[150vh] w-full rounded-lg  -mx-2 p-3 bg-slate-200     group-hover:top-0 transition-all ease-in-out duration-500 delay-150">
                <h1 className="font-bold text-lg text-gray-800 tracking-wider uppercase ">
                  overview
                </h1>
                <p className="font-sans text-lg text-slate-700">
                  {value.overview}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
