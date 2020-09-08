import React, { useState, useRef, useEffect } from "react";
import PlayPauseButton from "components/deck/audioPlayer/PlayPauseButton";
import TimeDisplay from "components/deck/audioPlayer/TimeDisplay";
import SongProgress from "components/deck/audioPlayer/SongProgress";

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

  // -- Local storage - song current time and duration --

  // On component first load, check if currentTime is stocked
  // in local storage and get it if it is
  useEffect(() => {
    const localCurrentInfo = JSON.parse(
      localStorage.getItem(`deck${deckName}CurrentInfo`)
    );
    // Check if there is something in local storage before getting info
    // (to avoid issues on first visit)
    if (localCurrentInfo) {
      setSongCurrentTime(localCurrentInfo.songCurrentTime);
      setSongDuration(localCurrentInfo.songDuration);
      player.current.currentTime = localCurrentInfo.songCurrentTime;
    }
  }, [deckName]);

  // If a song is playing, stock the current time in local storage.
  // To avoid resetting the currentTime in local storage on page refresh,
  // we check if it is different from 0 before saving the info.
  useEffect(() => {
    if (isPlaying && songCurrentTime !== 0) {
      localStorage.setItem(
        `deck${deckName}CurrentInfo`,
        JSON.stringify({
          songCurrentTime,
          songDuration,
          currentSong: loadedSong,
        })
      );
    }
  }, [songCurrentTime, deckName, isPlaying, loadedSong, songDuration]);

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
        className={`mx-2 my-3 mx-md-0 m-md-0 mt-md-3 m-lg-0 d-flex justify-content-between align-items-center ${layout.flexDirection}`}
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
