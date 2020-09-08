import React, { useState, createContext } from "react";
import discoDisk from "assets/mp3/lowdy_disco_disk.mp3";
import amazonas from "assets/mp3/smooth-operator-3000_amazonas.mp3";
import tempoMangabey from "assets/mp3/mc_solaar-le_tempo-mangabey-edit.mp3";
import umusozi from "assets/mp3/soulchyld_umusozi.mp3";

export const SongsContext = createContext();

const SongsContextProvider = ({ children }) => {
  // Full song list before any filtering
  const baseSongs = [
    {
      id: "track-1",
      artist: "Smooth Operator 3000",
      title: "Amazonas",
      src: amazonas,
    },
    { id: "track-2", artist: "Lowdy", title: "Disco Disk #1", src: discoDisk },
    {
      id: "track-3",
      artist: "Mc Solaar",
      title: "Le Tempo (Mangabey edit)",
      src: tempoMangabey,
    },
    { id: "track-4", artist: "Soulchyld", title: "Umusozi", src: umusozi },
  ];

  // We prepare a state for filtered songs
  const [filteredSongs, setFilteredSongs] = useState(baseSongs);

  // Updates the filteredSongs state depending on search value
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

  // Get a song by its id
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
