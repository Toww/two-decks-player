import React, { useRef, useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { DecksContext } from "../contexts/DecksContext";

const Deck = ({ deckObj }) => {
  const { loadedSong, isPlaying, layout, deckName } = deckObj;

  // Getting the play / pause function from Context
  const { playPauseDeck } = useContext(DecksContext);

  // Preparing states for song current time and duration
  const [songCurrentTime, setSongCurrentTime] = useState(0);
  const [songDuration, setSongDuration] = useState(0);

  // Set default song information if there is no loaded song
  const defaultInfo = { title: "-", artist: "Please load a song" };
  const songInfo = loadedSong ? loadedSong : defaultInfo;

  // Creating refs
  const player = useRef();
  const marker = useRef();
  const songProgressContainer = useRef();
  const songProgressBar = useRef();

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

  // Track duration, current time and progress bar
  useEffect(() => {
    // variables to keep the .current value and avoid 'exhaustive-deps" issue.
    const playerCurrent = player.current;
    const songProgressContainerCurrent = songProgressContainer.current;
    const songProgressBarCurrent = songProgressBar.current;

    // Displaying text and visual (in progress bar) current time
    const handleCurrentTime = (e) => {
      const currentTime = e.target.currentTime;
      const duration = e.target.duration;
      // update text current time
      setSongCurrentTime(currentTime);
      // update visual current time
      const playPercent = 100 * (currentTime / duration);
      songProgressBarCurrent.style.width = playPercent + "%"; // Updating the bar inside songProgress container
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

    // Add event listeners to update current time on each timeupdate,
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
    // Clean event listeners if component unmount
    return () => {
      playerCurrent.removeEventListener("timeupdate", handleCurrentTime);
      playerCurrent.removeEventListener("playing", handleDuration);
      songProgressContainerCurrent.removeEventListener(
        "click",
        handleProgressChange
      );
    };
  });

  // Each time isPlaying or loadedSong changes, plays/pauses the audio and marker accordingly.
  useEffect(() => {
    if (isPlaying) {
      player.current.play();
      marker.current.style.animationPlayState = "running";
    } else {
      player.current.pause();
      marker.current.style.animationPlayState = "paused";
    }
  }, [isPlaying, loadedSong]);

  // Resets marker animation state when a song is loaded
  useEffect(() => {
    marker.current.classList.remove("marker-active");
    void marker.current.offsetWidth; // Hack to trigger a reflow between removing and add
    marker.current.classList.add("marker-active");
  }, [loadedSong]);

  // Plays or pauses song if loaded in a deck
  const handlePlayPause = () => {
    if (loadedSong) {
      playPauseDeck(deckName);
    }
  };

  // Preparing play/pause button display
  const playPauseButton = isPlaying ? (
    <FontAwesomeIcon
      icon={faPauseCircle}
      size="lg"
      onClick={handlePlayPause}
      color={loadedSong ? "currentColor" : "rgba(255,255,255,0.2)"}
    />
  ) : (
    <FontAwesomeIcon
      icon={faPlayCircle}
      size="lg"
      onClick={handlePlayPause}
      color={loadedSong ? "currentColor" : "rgba(255,255,255,0.2)"}
    />
  );

  return (
    <>
      {/* If a song is loaded, add source to audio tag */}
      {loadedSong ? (
        <audio ref={player} src={loadedSong.src} />
      ) : (
        <audio ref={player} />
      )}

      {/* Deck  */}
      <Col className="">
        <div className="deck p-3">
          <Row className={layout.flexDirection}>
            {/* Info and controls */}
            <Col md={8}>
              <div
                className={`h-100 d-flex flex-column justify-content-between ${layout.textAlign}`}
              >
                {/* Song info */}
                <div
                  className={`bg-dark-3 p-2 d-flex flex-column justify-content-center ${layout.textAlign}`}
                >
                  <h1 className="m-0 font-weight-bold">{songInfo.title}</h1>
                  <h2 className="m-0">{songInfo.artist}</h2>
                </div>

                {/* Play/pause, time display and progress bar*/}
                <div>
                  {/* Song progress bar */}
                  <div
                    ref={songProgressContainer}
                    className="d-block w-100 mb-2 song-progress-container"
                  >
                    <div
                      ref={songProgressBar}
                      className="d-block song-progress-bar"
                    ></div>
                  </div>
                  <div
                    className={`m-0 d-flex justify-content-between align-items-center ${layout.flexDirection}`}
                  >
                    {/* Play/Pause button */}
                    <div>{playPauseButton}</div>

                    <div>
                      {/* If song is loaded, display currentTime and duration */}
                      {loadedSong
                        ? `${convertToDisplayTime(
                            songCurrentTime
                          )} / ${convertToDisplayTime(songDuration)}`
                        : ""}
                    </div>
                  </div>
                </div>
                {/* Deck name */}
                <div className="m-0 align-bottom font-weight-bold">
                  {deckName}
                </div>
              </div>
            </Col>
            {/* Deck disc with marker*/}
            <Col md={4}>
              <div className="deck-disc">
                <div className="abs-container">
                  <div className="rel-container">
                    <div ref={marker} className="marker"></div>
                    <div className="deck-disc-center"></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Deck;
