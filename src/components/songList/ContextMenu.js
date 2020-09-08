import React, { useRef, useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { DecksContext } from "contexts/DecksContext";

const ContextMenu = ({ songClickPosState, setsongClickPosState }) => {
  // Creating ref
  const contextMenu = useRef();

  // Get function to load song to chosen deck
  const { loadDeck } = useContext(DecksContext);

  // State to handle context-menu behavior when opened and closed
  const [contextMenuState, setContextMenuState] = useState({
    isVisible: false,
    hasJustBeenClosed: false,
  });

  // Hides the menu, check if should prevent next click
  // and adjusts hasJustBeenClosed accordingly
  // (to avoid re-opening menu when is closed by clicking outside of it)
  const hideContextMenu = (shouldPreventNextClick) => {
    contextMenu.current.classList.remove("d-block");
    contextMenu.current.classList.add("d-none");
    setContextMenuState({
      ...contextMenuState,
      isVisible: false,
      hasJustBeenClosed: shouldPreventNextClick,
    });
  };

  // Loads track to corresponding deck and closes context menu.
  const handleDeckLoad = (deckName) => {
    // Song to load was set in SongList component on click on a song,
    // we just need to specify which deck to load it in
    loadDeck(deckName);
    // Hides the context menu and sets hasJustBeenClosed to false,
    // to be able to directly click another song and open menu.
    hideContextMenu(false);
  };

  // On songClickPosState change, context menu appears next to mouse cursor
  // if menu is not visible and hasJustBeenClosed is false.
  // Else it turns hasJustBeenClosed to false so that next click on
  // a song will open the menu.
  useEffect(() => {
    // Opens or closes the contextMenu
    const showContextMenu = ({ pageX, pageY }) => {
      contextMenu.current.classList.remove("d-none");
      contextMenu.current.classList.add("d-block");
      contextMenu.current.style.left = `${pageX}px`;
      contextMenu.current.style.top = `${pageY}px`;
      setContextMenuState({
        ...contextMenuState,
        isVisible: true,
      });
    };

    if (songClickPosState) {
      if (
        contextMenuState.isVisible === false &&
        contextMenuState.hasJustBeenClosed === false
      ) {
        // Open the menu near the cursor
        showContextMenu(songClickPosState);
        setContextMenuState({
          ...contextMenuState,
          isVisible: true,
        });
        // set songClickPosState back to default
        setsongClickPosState(null);

        // If hasJustBeenClosed is true, set it to false to be able to open
        // menu on next click and reset songClickPosState.
      } else if (contextMenuState.hasJustBeenClosed === true) {
        setContextMenuState({ ...contextMenuState, hasJustBeenClosed: false });
        setsongClickPosState(null);
      }
    }
  }, [songClickPosState, contextMenuState, setsongClickPosState]);

  // On each render, adds an event listener to close menu on click outside
  // of it when menu is visible
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
  });

  return (
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
  );
};

export default ContextMenu;
