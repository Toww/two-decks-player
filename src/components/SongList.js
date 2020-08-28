import React, { useContext, useRef, useEffect, useState } from "react";
import { Table, ListGroup } from "react-bootstrap";
import Song from "./Song";
import { SongsContext } from "../contexts/SongsContext";
import { DecksContext } from "../contexts/DecksContext";

const SongList = () => {

  // Get states and functions for the songs and decks via Context.
  const { filteredSongs, getSongById } = useContext(SongsContext);
  const { loadDeck } = useContext(DecksContext);

  // State to handle context-menu behavior when opened and closed
  const [contextMenuState, setContextMenuState] = useState({
    isVisible: false,
    hasJustBeenClosed: false,
  });

  // State to prepare the song that will be loaded in a deck
  const [songToLoad, setSongToLoad] = useState(null);

  // Ref for the context menu (menu to load track on deck A or B)
  const contextMenu = useRef();

  // Opens or close the contextMenu
  const showContextMenu = (clickEvent) => {
    contextMenu.current.classList.remove("d-none");
    contextMenu.current.classList.add("d-block");
    contextMenu.current.style.left = `${clickEvent.pageX}px`;
    contextMenu.current.style.top = `${clickEvent.pageY}px`;
    setContextMenuState({ ...contextMenuState, isVisible: true });
  };

  // Hides the menu, check if we can directly click on another song
  // and re-open context-menu or not (useful when clicked outside menu to close it)
  const hideContextMenu = (shouldPreventNextClick) => {
    contextMenu.current.classList.remove("d-block");
    contextMenu.current.classList.add("d-none");
    setContextMenuState({
      isVisible: false,
      hasJustBeenClosed: shouldPreventNextClick,
    });
  };

  // When contextMenuState changes, adds or remove an
  // event listener to trigger to close context menu if 
  // visible and click happens outside of it
  useEffect(() => {
    // Checks if user clicks outside of context menu,
    // close it if he does
    const handleOutsideClick = (e) => {
      if (!contextMenu.current.contains(e.target)) {
        hideContextMenu(true);
      }
    };
    // Adds click event listener
    if (contextMenuState.isVisible === true) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      // Removes the event listener on unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [contextMenuState]);

  // On click on a song, context menu appears next
  // to mouse cursor if not visible and hasJustBeenClosed is false.
  // Else it turns hasJustBeenClosed to false so that next click on
  // a song will open the context menu.
  const handleSongClick = (e, songId) => {
    if (
      contextMenuState.isVisible === false &&
      contextMenuState.hasJustBeenClosed === false
    ) {
      showContextMenu(e);
      // Setting the song that will be loaded if click on the Deck A or B.
      setSongToLoad(getSongById(songId));
    } else if (contextMenuState.hasJustBeenClosed === true) {
      setContextMenuState({ ...contextMenuState, hasJustBeenClosed: false });
    }
  };

  // Loads track to corresponding deck and closes context menu.
  const handleDeckLoad = (deckName) => {
    loadDeck(deckName, songToLoad);
      // Hides the context menu and sets hasJustBeenClosed to false,
      // so that you can directly click another song and open menu.
    hideContextMenu(false);
  };

  return (
    <>
      {/* Context Menu */}
      <ListGroup
        variant="flush"
        className="d-none shadow-lg position-absolute rounded context-menu"
        ref={contextMenu}
      >
        <ListGroup.Item onClick={() => handleDeckLoad("A", songToLoad)} action>
          Play in Deck A
        </ListGroup.Item>
        <ListGroup.Item onClick={() => handleDeckLoad("B", songToLoad)} action>
          Play in Deck B
        </ListGroup.Item>
      </ListGroup>

      {/* SongList Table */}
      <Table striped hover variant="dark">
        <thead>
          <tr className="bg-dark-3">
            <th>Song</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song) => (
            <Song
              title={song.title}
              artist={song.artist}
              key={song.id}
              handleSongClick={(e) => handleSongClick(e, song.id)}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SongList;
