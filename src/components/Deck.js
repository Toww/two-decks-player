import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Deck = ({ deckObj }) => {

  // Set default song information if there is no loaded song
  const defaultInfo = { title: "-", artist: "Please load a song" };
  const songInfo = deckObj.loadedSong ? deckObj.loadedSong : defaultInfo;

  // If deck is playing we add the class marker-active to the marker to
  // begin its rotation
  const markerStatus = deckObj.isPlaying ? "marker-active" : "";

  return (
    <Col className="">
      <div className="deck p-3">
        <Row className={deckObj.layout.flexDirection}>
          {/* Info and controls */}
          <Col md={8}>
            <div
              className={`h-100 d-flex flex-column justify-content-between ${deckObj.layout.textAlign}`}
            >
              {/* Song info */}
              <div
                className={`bg-dark-3 p-2 d-flex flex-column justify-content-center ${deckObj.layout.textAlign}`}
              >
                <h1 className="m-0 font-weight-bold">{songInfo.title}</h1>
                <h2 className="m-0">{songInfo.artist}</h2>
              </div>
              {/* Play / pause */}
              <div className="m-0">
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="my-2"
                  size="2x"
                />
              </div>
              {/* Deck name */}
              <div className="m-0 align-bottom font-weight-bold">
                {deckObj.layout.name}
              </div>
            </div>
          </Col>
          {/* Deck disc */}
          <Col md={4}>
            <div className="deck-disc">
              <div className="abs-container">
                <div className="rel-container">
                  <div className={`marker ${markerStatus}`}></div>
                  <div className="deck-disc-center"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Deck;
