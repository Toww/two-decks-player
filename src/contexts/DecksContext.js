import React, { useState, createContext } from "react";

export const DecksContext = createContext();

const DecksContextProvider = ({ children }) => {
  // Preparing the state for both Decks
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

  // Loads a song in a specific deck, play the track and stop the other deck
  const loadDeck = (deckName, songToLoad) => {
    if (deckName === "A") {
      setDeckAState({ ...deckAState, loadedSong: songToLoad, isPlaying: true });
      setDeckBState({ ...deckBState, isPlaying: false });
    } else if (deckName === "B") {
      setDeckBState({ ...deckBState, loadedSong: songToLoad, isPlaying: true });
      setDeckAState({ ...deckAState, isPlaying: false });
    }
  };

  return (
    <DecksContext.Provider
      value={{
        deckAState,
        setDeckAState,
        deckBState,
        setDeckBState,
        loadDeck,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContextProvider;
