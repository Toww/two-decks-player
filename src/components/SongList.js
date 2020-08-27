import React, { useContext, useRef, useEffect, useState } from "react";
import { Table, ListGroup } from "react-bootstrap";
import Song from "./Song";
import { SongsContext } from "../contexts/SongsContext";
import { DecksContext } from "../contexts/DecksContext";

const SongList = () => {
  // We get states and functions for the songs and decks via Context.
  const { filteredSongs, getSongById } = useContext(SongsContext);
  const { deckAState, deckBState, setDeckAState, setDeckBState } = useContext(
    DecksContext
  );

  // Setting a state to handle context-menu behavior when opened and closed
  const [contextMenuState, setContextMenuState] = useState({
    isVisible: false,
    hasJustBeenClosed: false,
  });

  // Setting a state to prepare a song to be loaded on click in the song list
  const [songToLoad, setSongToLoad] = useState(null);

  // Creating a ref for the context menu (used to load track on deck A or B)
  const contextMenu = useRef();

  // Functions to open or close the contextMenu
  const showContextMenu = (clickEvent) => {
    contextMenu.current.classList.remove("d-none");
    contextMenu.current.classList.add("d-block");
    contextMenu.current.style.left = `${clickEvent.pageX}px`;
    contextMenu.current.style.top = `${clickEvent.pageY}px`;
    setContextMenuState({ ...contextMenuState, isVisible: true });
  };

  // When hiding the menu, we check if we can directly click on another
  // song and re-open context-menu or not (useful when clicked outside to close)
  const hideContextMenu = (shouldPreventOtherClick) => {
    contextMenu.current.classList.remove("d-block");
    contextMenu.current.classList.add("d-none");
    setContextMenuState({
      isVisible: false,
      hasJustBeenClosed: shouldPreventOtherClick,
    });
  };

  // When contextMenuState changes, we add or remove an
  // event listener to trigger handleOutsideClick if the
  // context menu is visible.
  useEffect(() => {
    // Check if the user clicks outside of
    // the context menu to close it if he does
    const handleOutsideClick = (e) => {
      if (!contextMenu.current.contains(e.target)) {
        hideContextMenu(true);
      }
    };

    if (contextMenuState.isVisible === true) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      // Removes the event listener on unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [contextMenuState]);

  // On click on a song, the contextMenu appears next
  // to the mouse cursor and state is updated if it wasn't visible,
  // else it turns hasJustBeenClosed to false, so that next click on
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

  const handleDeckLoad = (deckName) => {
    if (deckName === "A") {
      setDeckAState({ ...deckAState, loadedSong: songToLoad });
      hideContextMenu(false);
    } else if (deckName === "B") {
      setDeckBState({ ...deckBState, loadedSong: songToLoad });
      hideContextMenu(false);
    }
    console.log("A", deckAState);
    console.log("B", deckBState);
  };

  return (
    <>
      {/* Context Menu */}
      <ListGroup
        variant="flush"
        className="d-none shadow-lg position-absolute rounded context-menu"
        ref={contextMenu}
      >
        <ListGroup.Item onClick={() => handleDeckLoad("A")} action>
          Play in Deck A
        </ListGroup.Item>
        <ListGroup.Item onClick={() => handleDeckLoad("B")} action>
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
