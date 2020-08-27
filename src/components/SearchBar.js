import React, { useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { SongsContext } from "../contexts/SongsContext";

const SearchBar = () => {
  const { filterSongs } = useContext(SongsContext);

  // This ref will be used to clear search input from the clear icon
  const searchInput = useRef();

  // This state will be used to display search or clear-search icon
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = (searchValue) => {
    // Make search active if searchBar is not empty, put it back to default if
    // every character was erased
    searchValue ? setSearchActive(true) : setSearchActive(false);
    // filter songs depending on lower-cased input
    filterSongs(searchValue.toLowerCase());
  };

  const clearSearch = () => {
    // Set search back to default
    handleSearch("");
    // Clear search input
    searchInput.current.value = "";
  };

  return (
    <form className="d-flex justify-content-center align-items-center mt-4 mb-3">
      <label
        htmlFor="song-search"
        className="m-0 p-0 d-flex align-items-center"
      >
        {
          // If search is active show search icon, else show clear search icon
          searchActive ? (
            <FontAwesomeIcon
              icon={faTimesCircle}
              alt="Clear search icon"
              className="mr-2"
              onClick={clearSearch}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSearch}
              alt="Search icon"
              className="mr-2"
            />
          )
        }
      </label>
      <input
        type="text"
        id="song-search"
        name="song-search"
        placeholder="Search a song (by title or artist name)"
        className="w-75"
        onChange={(e) => handleSearch(e.target.value)}
        ref={searchInput}
      />
    </form>
  );
};

export default SearchBar;
