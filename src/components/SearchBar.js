import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <form className="d-flex justify-content-center align-items-center mt-4 mb-3">
      <label htmlFor="song-search" className="m-0 p-0 d-flex align-items-center">
        <FontAwesomeIcon icon={faSearch} size="md" alt="Search icon" className="mr-2"/></label>
      <input
        type="text"
        id="song-search"
        name="song-search"
        placeholder="Search a song"
        className="w-75"
      />
    </form>
  );
};

export default SearchBar;
