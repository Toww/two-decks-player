import React from "react";

const TimeDisplay = ({ loadedSong, songCurrentTime, songDuration }) => {
  // Function to convert current time or duration
  // to minutes and seconds
  const convertToDisplayTime = (baseTime) => {
    // As baseTime is in seconds:
    const minutes = Math.floor(baseTime / 60);
    const seconds = (baseTime % 60).toFixed(0);
    // if the seconds or minutes ar inferior to 10,
    // we add a 0 in front of it
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  return (
    <div>
      {/* If song is loaded, display currentTime and duration */}
      {loadedSong
        ? `${convertToDisplayTime(songCurrentTime)} / ${convertToDisplayTime(
            songDuration
          )}`
        : ""}
    </div>
  );
};

export default TimeDisplay;
