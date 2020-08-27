import React, { useContext, useRef, useEffect, useState } from "react";
import { Table, ListGroup } from "react-bootstrap";
import Song from "./Song";
import { SongsContext } from "../contexts/SongsContext";

const SongList = () => {
  // We get the filteredSongs array from SongsContext
  const { filteredSongs } = useContext(SongsContext);

  // Creating a ref for the context menu (used to load track on deck A or B)
  const contextMenu = useRef();

  // Setting a state to handle context-menu behavior when opened and closed
  const [contextMenuState, setContextMenuState] = useState({
    isVisible: false,
    hasJustBeenClosed: false,
  });

  // Check if the user clicks outside of
  // the context menu to close it if he does
  const handleOutsideClick = (e) => {
    if (!contextMenu.current.contains(e.target)) {
      contextMenu.current.classList.remove("d-block");
      contextMenu.current.classList.add("d-none");
      setContextMenuState({ isVisible: false, hasJustBeenClosed: true });
    }
  };

  // When contextMenuState changes, we add or remove an
  // event listener to trigger handleOutsideClick if the 
  // context menu is visible.
  useEffect(() => {
    if (contextMenuState.isVisible === true) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      // Removes the event listener on unmount
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [contextMenuState]);

  const handleContextMenu = (e) => {
    // On click on a song, the contextMenu appears next
    // to the mouse cursor and state is updated if it wasn't visible,
    // else it turns hasJustBeenClosed to false, so that next click on
    // a song will open the context menu.
    if (
      contextMenuState.isVisible === false &&
      contextMenuState.hasJustBeenClosed === false
    ) {
      contextMenu.current.classList.remove("d-none");
      contextMenu.current.classList.add("d-block");
      contextMenu.current.style.left = `${e.pageX}px`;
      contextMenu.current.style.top = `${e.pageY}px`;
      setContextMenuState({ ...contextMenuState, isVisible: true });
      console.log(contextMenuState);
    } else if (contextMenuState.hasJustBeenClosed === true) {
      setContextMenuState({ ...contextMenuState, hasJustBeenClosed: false,
      });
    }
  };

  return (
    <>
      {/* Context Menu */}
      <ListGroup
        variant="flush"
        className="d-none shadow-lg position-absolute rounded context-menu"
        ref={contextMenu}
      >
        <ListGroup.Item action>Play in Deck A</ListGroup.Item>
        <ListGroup.Item action>Play in Deck B</ListGroup.Item>
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
              handleContextMenu={handleContextMenu}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SongList;
