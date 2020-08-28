import React, { useState, createContext } from "react";
import { v4 as uuidv4 } from "uuid"; // Using uuid to generate a unique id for each song
import discoDisk from "../mp3/lowdy_disco_disk.mp3";
import amazonas from "../mp3/smooth-operator-3000_amazonas.mp3";
import mixFairbanks from "../mp3/mix_fairbanks-mp006.mp3";
import tempoMangabey from "../mp3/mc_solaar-le_tempo-mangabey-edit.mp3";
import umusozi from "../mp3/soulchyld_umusozi.mp3";

export const SongsContext = createContext();

const SongsContextProvider = ({ children }) => {
  // This is the full song list before any filtering
  const baseSongs = [
    {
      id: uuidv4(),
      artist: "Smooth Operator 3000",
      title: "Amazonas",
      src: amazonas,
    },
    { id: uuidv4(), artist: "Lowdy", title: "Disco Disk #1", src: discoDisk },
    {
      id: uuidv4(),
      artist: "Mc Solaar",
      title: "Le Tempo (Mangabey edit)",
      src: tempoMangabey,
    },
    {
      id: uuidv4(),
      artist: "Mix & Fairbanks",
      title: "M&P006",
      src: mixFairbanks,
    },
    { id: uuidv4(), artist: "Soulchyld", title: "Umusozi", src: umusozi },
  ];

  // We prepare a state for filtered songs
  const [filteredSongs, setFilteredSongs] = useState(baseSongs);

  // On call to filterSongs function, we update the filteredSongs state
  const filterSongs = (searchValue) => {
    setFilteredSongs(
      baseSongs.filter((song) => {
        // if song title or artist name contains the search value, they return true and song
        // is included in filtered array, else it returns false and is not included.
        return (
          song.title.toLowerCase().includes(searchValue) ||
          song.artist.toLowerCase().includes(searchValue)
        );
      })
    );
  };

  // Getting a song by its id
  const getSongById = (songId) => {
    return baseSongs.find((song) => {
      return song.id === songId;
    });
  };

  return (
    <SongsContext.Provider value={{ filterSongs, filteredSongs, getSongById }}>
      {children}
    </SongsContext.Provider>
  );
};

export default SongsContextProvider;
