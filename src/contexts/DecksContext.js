import React, { useState, createContext } from "react";

export const DecksContext = createContext();

const DecksContextProvider = ({ children }) => {
  // Preparing the state for both Decks
  const [deckAState, setDeckAState] = useState({
    deckName: "A",
    isPlaying: false,
    loadedSong: null,
    layout: {
      flexDirection: "flex-row",
      textAlign: "text-left",
    },
  });

  const [deckBState, setDeckBState] = useState({
    deckName: "B",
    isPlaying: false,
    loadedSong: null,
    layout: {
      flexDirection: "flex-row-reverse",
      textAlign: "text-right",
    },
  });

  // Loads a song in a specific deck, play the track and stop the other deck
  const loadDeck = (deckNameArg, songToLoad) => {
    if (deckNameArg === "A") {
      setDeckAState({ ...deckAState, loadedSong: songToLoad, isPlaying: true });
      setDeckBState({ ...deckBState, isPlaying: false });
    } else if (deckNameArg === "B") {
      setDeckBState({ ...deckBState, loadedSong: songToLoad, isPlaying: true });
      setDeckAState({ ...deckAState, isPlaying: false });
    }
  };

  // Checks if the deck is playing, if so it stops it, if not
  // it plays it and stops the other deck
  const playPauseDeck = (deckNameArg) => {
    if (deckNameArg === "A") {
      if (deckAState.isPlaying) {
        setDeckAState({ ...deckAState, isPlaying: false });
      } else {
        setDeckAState({ ...deckAState, isPlaying: true });
        setDeckBState({ ...deckBState, isPlaying: false });
      }
    } else if (deckNameArg === "B") {
      if (deckBState.isPlaying) {
        setDeckBState({ ...deckBState, isPlaying: false });
      } else {
        setDeckBState({ ...deckBState, isPlaying: true });
        setDeckAState({ ...deckAState, isPlaying: false });
      }
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
        playPauseDeck,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContextProvider;
