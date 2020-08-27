import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid"; // Using uuid to generate a unique id for each song

export const SongsContext = createContext();

const SongsContextProvider = ({ children }) => {
  // This is the full list before any filtering
  const baseSongs = [
    { id: uuidv4(), artist: "LB aka Labat", title: "1993" },
    { id: uuidv4(), artist: "2Pac", title: "Do For Love" },
    { id: uuidv4(), artist: "The Notorious B.I.G", title: "Juicy" },
    { id: uuidv4(), artist: "Bill Laurance", title: "The Good Things" },
    { id: uuidv4(), artist: "Amon Tobin", title: "The Killer's Vanilla" },
  ];

  // We prepare a state for filtered songs
  const [filteredSongs, setFilteredSongs] = useState(baseSongs);

  const filterSongs = (searchValue) => {
    // On call to filterSongs function, we update the filteredSongs state
    setFilteredSongs(baseSongs.filter((song) => {
      // if song title or artist name contains the search value, they return true and song
      // is included in filtered array, else it returns false and is not included.
      return (
        song.title.toLowerCase().includes(searchValue) ||
        song.artist.toLowerCase().includes(searchValue)
      );
    }));
  };

  return (
    // filterSongs function will be used in the SearchBar
    // and the filteredSongs array in the SongList so we provide them
    <SongsContext.Provider value={{filterSongs, filteredSongs }}>
      {children}
    </SongsContext.Provider>
  );
};

export default SongsContextProvider;
