import React, { useRef, useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";
import { DecksContext } from "../contexts/DecksContext";

const Deck = ({ deckObj }) => {
  const { loadedSong, isPlaying, layout, deckName } = deckObj;

  // Getting the play / pause function from Context
  const { playPauseDeck } = useContext(DecksContext);

  // Set default song information if there is no loaded song
  const defaultInfo = { title: "-", artist: "Please load a song" };
  const songInfo = loadedSong ? loadedSong : defaultInfo;

  // Creating ref for the player and marker
  const player = useRef();
  const marker = useRef();

  // First time component loads, we add "marker-active" class
  // to the marker to prevent it to start rotating before React loads.
  useEffect(() => {
    marker.current.classList.add("marker-active");
  }, []);

  // Each time isPlaying changes, plays or pauses the audio
  useEffect(() => {
    if (isPlaying) {
      player.current.play();
      marker.current.style.webkitAnimationPlayState = "running";
    } else {
      player.current.pause();
      marker.current.style.webkitAnimationPlayState = "paused";
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (loadedSong) {
      playPauseDeck(deckName);
    }
  };

  // Preparing play / pause button
  const playPauseButton = isPlaying ? (
    <FontAwesomeIcon
      icon={faPauseCircle}
      className="my-2"
      size="2x"
      onClick={handlePlayPause}
      color={loadedSong ? "currentColor" : "rgba(255,255,255,0.2)"}
    />
  ) : (
    <FontAwesomeIcon
      icon={faPlayCircle}
      className="my-2"
      size="2x"
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
                {/* Play / pause */}
                <div className="m-0">{playPauseButton}</div>
                {/* Deck name */}
                <div className="m-0 align-bottom font-weight-bold">
                  {deckName}
                </div>
              </div>
            </Col>
            {/* Deck disc */}
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
