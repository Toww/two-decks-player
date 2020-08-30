import React, { useRef, useEffect } from "react";

const DeckDisc = ({ isPlaying, loadedSong }) => {
  const marker = useRef();

   // Each time isPlaying or loadedSong changes, the marker rotates or pauses.
   useEffect(() => {
    if (isPlaying) {
      marker.current.style.animationPlayState = "running";
    } else {
      marker.current.style.animationPlayState = "paused";
    }
  }, [isPlaying, loadedSong]);

  // Resets marker animation state when a song is loaded
  useEffect(() => {
    marker.current.classList.remove("marker-active");
    void marker.current.offsetWidth; // Hack to trigger a DOM reflow between removing and adding class
    marker.current.classList.add("marker-active");
  }, [loadedSong]);

  return (
      <div className="deck-disc">
        <div className="abs-container">
          <div className="rel-container">
            <div ref={marker} className="marker"></div>
            <div className="deck-disc-center"></div>
          </div>
        </div>
      </div>
  );
};

export default DeckDisc;
