import React, { useState } from "react";

export default function SearchBar({ handleSearch, loadBooks }) {
  const [title, setTitle] = useState("");

  const onSearch = () => {
    if (title.trim() !== "") {
      handleSearch(title); //calls parent function
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  const onClear = () => {
    loadBooks(); //calls parent function
  };
  return (
    <div
      style={{
        display: "flex",
        position: "absolute", // make it float over page
        top: "20px", // distance from top
        right: "20px", // distance from right
        gap: "10px",
        zIndex: 1000, // ensure it's on top
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Search book..."
        style={{ padding: "8px", width: "250px" }}
      />
      <button onClick={onSearch} style={{ padding: "8px 16px" }}>
        Search
      </button>
      <button onClick={onClear} style={{ padding: "8px 16px" }}>
        Clear
      </button>
    </div>
  );
}
