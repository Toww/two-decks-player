import React, { useState, createContext, useEffect } from "react";

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

  // State to prepare the song that will be loaded in a deck
  const [songToLoad, setSongToLoad] = useState(null);

  // Loads a song in a specific deck, play the track and stop the other deck
  const loadDeck = (deckNameArg) => {
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

  // -- Local storage --

  // On first load, check if there are informations stocked in local storage,
  // if there are, set the deck state accordingly.
  // /!\ To avoid autoplay warnings and an agressive start of the song,
  // isPlaying is set to false, and user will be free to hit play again
  
  useEffect(() => {
    const localDeckA = JSON.parse(localStorage.getItem("localDeckAState"));
    const localDeckB = JSON.parse(localStorage.getItem("localDeckBState"));
    if (localDeckA) {
      setDeckAState({ ...localDeckA, isPlaying: false });
    }
    if (localDeckB) {
      setDeckBState({ ...localDeckB, isPlaying: false });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("localDeckAState", JSON.stringify(deckAState));
  }, [deckAState]);

  useEffect(() => {
    localStorage.setItem("localDeckBState", JSON.stringify(deckBState));
  }, [deckBState]);

  return (
    <DecksContext.Provider
      value={{
        deckAState,
        setDeckAState,
        deckBState,
        setDeckBState,
        loadDeck,
        playPauseDeck,
        setSongToLoad,
      }}
    >
      {children}
    </DecksContext.Provider>
  );
};

export default DecksContextProvider;
