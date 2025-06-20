import React, { useState, useEffect, useRef } from "react";

const SearchInput = ({ onSearch, delay = 300, placeholder = "Search..." }) => {
  const [input, setInput] = useState("");
  const debounceTimeout = useRef(null);

  useEffect(() => {
    // Clear previous timeout if input changes within delay
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set new debounce timeout
    debounceTimeout.current = setTimeout(() => {
      console.log(input, "my input")
      onSearch('search',input);
    }, delay);

    // Cleanup on unmount
    return () => clearTimeout(debounceTimeout.current);
  }, [input, delay, onSearch]);

  return (
    <div className="searchblock">
      <input
        className="search-input"
        name="search"
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <i className="fa fa-search"></i>
    </div>
  );
};

export default SearchInput;
