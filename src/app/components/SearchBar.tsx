"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSearch, saveLocation } from "../lib";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const localStorageForecast: string | null = localStorage.getItem("location");

  useEffect(() => {
    localStorageForecast && router.push("/forecast");
  }, [router]);

  const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    city.length <= 1 && setIsDisabled(true);

    try {
      if (value) {
        const result = await getSearch(value);
        setCity(result);
      } else {
        setCity([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="w-3/4 md:w-2/5 h-96 p-6 flex flex-col gap-16 bg-sky-500 border border-cyan-600 rounded-xl shadow-md shadow-cyan-700/45">
      <h1 className="font-sans text-center font-medium text-3xl md:text-4xl">
        Weather Report
      </h1>
      <form
        onSubmit={saveLocation}
        className="h-full flex flex-row justify-around items-start"
      >
        <div className="md:w-2/5 grid gap-2">
          <input
            className="w-48 md:h-9 md:w-64 md:text-xl font-medium text-black py-0.5 rounded focus:outline-double focus:outline-cyan-400"
            type="text"
            name="location"
            value={inputValue}
            onChange={onInputChange}
          />
          {inputValue.trim().length > 2 && (
            <Options
              setInputValue={setInputValue}
              setIsDisabled={setIsDisabled}
              locations={city}
            />
          )}
        </div>

        <button
          disabled={isDisabled}
          type="submit"
          className="font-medium text-lg md:text-2xl disabled:text-gray-300 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

interface OptionProps {
  locations: { id: number; name: string; region?: string }[];
  setInputValue: (name: string) => void;
  setIsDisabled: (bool: boolean) => void;
}

function Options({ locations, setInputValue, setIsDisabled }: OptionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (locations.length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [locations]);

  const setValue = (name: string) => {
    setInputValue(name);
    setIsDisabled(false);
    setIsVisible(false);
  };

  const options = locations.map((x) => (
    <li
      key={x.id}
      onClick={() => setValue(x.name)}
      className="p-1 text-black cursor-pointer border-slate-800/25 border-b-2 last:border-b-0"
    >
      {x.name && (
        <span className="text-xs text-slate-50/75 md:text-lg font-medium">
          {x.name}
          {x.region && `, ${x.region}`}
        </span>
      )}
    </li>
  ));

  return (
    <ul
      className={`md:w-max p-1 bg-zinc-900/25 rounded-lg transition-all duration-300 ease-in transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {options}
    </ul>
  );
}
