import React, { useRef, useEffect } from "react";

const SongProgress = ({
  player,
  setSongCurrentTime,
  setSongDuration,
  loadedSong,
  songDuration,
}) => {
  // Creating refs
  const songProgressContainer = useRef();
  const songProgressBar = useRef();

  // Track duration, current time and progress bar
  useEffect(() => {
    // variables to keep the .current value and avoid 'exhaustive-deps" issue.
    const playerCurrent = player.current;
    const songProgressContainerCurrent = songProgressContainer.current;
    const songProgressBarCurrent = songProgressBar.current;

    // Updating text and visual current time
    const handleCurrentTime = (e) => {
      const currentTime = e.target.currentTime;
      const duration = e.target.duration;
      // update text current time
      setSongCurrentTime(currentTime);
      // update visual current time (progress bar)
      const playPercent = 100 * (currentTime / duration);
      songProgressBarCurrent.style.width = playPercent + "%";
    };

    // Setting song duration
    const handleDuration = (e) => {
      setSongDuration(e.target.duration);
    };

    // Handling click on song progress bar
    const handleProgressChange = (e) => {
      // To get click position in the container, we compare the click position to the container position.
      const clickLeftPos = e.clientX;
      const containerLeftPos = songProgressContainerCurrent.getBoundingClientRect()
        .left;
      const containerWidth = songProgressContainerCurrent.offsetWidth;
      const clickPosInContainer = clickLeftPos - containerLeftPos;

      // Click position in percentage
      const clickPosPercent = clickPosInContainer / containerWidth;
      // Click position in seconds
      const clickPosTimeVal = clickPosPercent * songDuration;

      // Update current Time (state and audio)
      setSongCurrentTime(clickPosTimeVal);
      player.current.currentTime = clickPosTimeVal;
    };

    // Adding event listeners to update current time on each timeupdate,
    // song duration each time song is played / unpaused,
    // song progression on click on progressbar
    if (loadedSong) {
      playerCurrent.addEventListener("timeupdate", handleCurrentTime);
      playerCurrent.addEventListener("playing", handleDuration);
      songProgressContainerCurrent.addEventListener(
        "click",
        handleProgressChange
      );
    }
    // Clean event listeners on component unmount
    return () => {
      playerCurrent.removeEventListener("timeupdate", handleCurrentTime);
      playerCurrent.removeEventListener("playing", handleDuration);
      songProgressContainerCurrent.removeEventListener(
        "click",
        handleProgressChange
      );
    };
  });

  return (
    <div
      ref={songProgressContainer}
      className="d-block w-100 mb-2 song-progress-container"
    >
      <div ref={songProgressBar} className="d-block song-progress-bar"></div>
    </div>
  );
};

export default SongProgress;
