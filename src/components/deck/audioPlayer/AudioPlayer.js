import React, { useState, useRef, useEffect } from "react";
import PlayPauseButton from "./PlayPauseButton";
import TimeDisplay from "./TimeDisplay";
import SongProgress from "./SongProgress";

const AudioPlayer = ({ loadedSong, isPlaying, layout, deckName }) => {
  // Creating refs
  const player = useRef();

  // Preparing states for song current time and duration
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);

  // Each time isPlaying or loadedSong changes, plays/pauses the audio.
  useEffect(() => {
    if (isPlaying) {
      player.current.play();
    } else {
      player.current.pause();
    }
  }, [isPlaying, loadedSong]);

  return (
    <div>
      {/* If a song is loaded, add source to audio tag */}
      {loadedSong ? (
        <audio ref={player} src={loadedSong.src} />
      ) : (
        <audio ref={player} />
      )}

      {/* Song progress bar */}
      <SongProgress
        player={player}
        loadedSong={loadedSong}
        songDuration={songDuration}
        setSongDuration={setSongDuration}
        setSongCurrentTime={setSongCurrentTime}
      />

      {/* Play/Pause and Time Display */}
      <div
        className={`m-0 d-flex justify-content-between align-items-center ${layout.flexDirection}`}
      >
        <PlayPauseButton
          isPlaying={isPlaying}
          loadedSong={loadedSong}
          deckName={deckName}
        />
        <TimeDisplay
          loadedSong={loadedSong}
          songCurrentTime={songCurrentTime}
          songDuration={songDuration}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
