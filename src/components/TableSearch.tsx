"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

const TableSearch = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const updateSearchParams = debounce((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.replace(`${window.location.pathname}?${params}`);
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.target.value;
    setSearchValue(value);

    updateSearchParams(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the form from submitting
    }
  };

  useEffect(() => {
    return () => {
      updateSearchParams.cancel();
    };
  }, []);

  return (
    <form className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
      <Image src="/search.png" alt="" width={14} height={14} />
      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default TableSearch;
