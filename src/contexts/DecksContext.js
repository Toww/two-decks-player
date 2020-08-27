import React, { useState, createContext } from "react";

export const DecksContext = createContext();

const DecksContextProvider = ({ children }) => {
  // We prepare the state for both Decks
  const [deckAState, setDeckAState] = useState({
    isPlaying: false,
    loadedSong: null,
    layout: {
      name: "A",
      flexDirection: "flex-row",
      textAlign: "text-left",
    },
  });

  const [deckBState, setDeckBState] = useState({
    isPlaying: false,
    loadedSong: null,
    layout: {
      name: "B",
      flexDirection: "flex-row-reverse",
      textAlign: "text-right",
    },
  });

  return (
    // filterSongs function will be used in the SearchBar
    // and the filteredSongs array in the SongList so we provide them
    <DecksContext.Provider
      value={{ deckAState, setDeckAState, deckBState, setDeckBState }}
    >
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContextProvider;
