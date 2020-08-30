import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { DecksContext } from "../../../contexts/DecksContext";

const PlayPauseButton = ({ isPlaying, loadedSong, deckName }) => {
  // Getting the play / pause function from DecksContext
  const { playPauseDeck } = useContext(DecksContext);

  // Plays or pauses song  on button click if loaded
  const handlePlayPause = () => {
    if (loadedSong) {
      playPauseDeck(deckName);
    }
  };

  return (
    <div>
      {isPlaying ? (
        <FontAwesomeIcon
          icon={faPauseCircle}
          size="lg"
          onClick={handlePlayPause}
          color="currentColor"
        />
      ) : (
        <FontAwesomeIcon
          className={loadedSong ? "cursor-pointer" : ""}
          icon={faPlayCircle}
          size="lg"
          onClick={handlePlayPause}
          color={loadedSong ? "currentColor" : "rgba(255,255,255,0.2)"}
        />
      )}
    </div>
  );
};

export default PlayPauseButton;
