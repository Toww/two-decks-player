import React, { useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { SongsContext } from "../contexts/SongsContext";

const SearchBar = () => {
  const { filterSongs } = useContext(SongsContext);

  // Creating ref
  const searchInput = useRef();

  // State to display search or clear-search icon
  const [searchActive, setSearchActive] = useState(false);

  // Makes search active if searchBar is not empty, puts it back to default if
  // every character was erased
  const handleSearch = (searchValue) => {
    searchValue ? setSearchActive(true) : setSearchActive(false);
    // filter songs depending on lower-cased input
    filterSongs(searchValue.toLowerCase());
  };

  //Clears search
  const clearSearch = () => {
    // Set search back to default
    handleSearch("");
    // Clear search input
    searchInput.current.value = "";
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="d-flex justify-content-center align-items-center mt-4 mb-3">
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
              className="mr-2 cursor-pointer"
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
