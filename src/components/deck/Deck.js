import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import DeckDisc from "./DeckDisc";
import SongInfo from "./SongInfo";
import AudioPlayer from "./audioPlayer/AudioPlayer";
import DropZone from "./DropZone";

const Deck = ({ deckState }) => {
  const { loadedSong, isPlaying, layout, deckName } = deckState;

  return (
    <Col>
      <div className="p-3 bg-light-gray">
        <Row className={layout.flexDirection}>
          {/* Info and Audio Player */}
          <Col md={8}>
            <div
              className={`h-100 d-flex flex-column justify-content-between ${layout.textAlign}`}
            >
              <SongInfo textAlign={layout.textAlign} loadedSong={loadedSong} />
              <AudioPlayer
                loadedSong={loadedSong}
                layout={layout}
                isPlaying={isPlaying}
                deckName={deckName}
              />
              {/* Deck name */}
              <div className="m-0 align-bottom font-weight-bold">
                {deckName}
              </div>
            </div>
          </Col>
          {/* Deck Disc */}
          <Col md={4}>
            <DeckDisc isPlaying={isPlaying} loadedSong={loadedSong} />
          </Col>
        </Row>
        {/* Drop Zone for drag and drop */}
        <DropZone deckName={deckName} />
      </div>
    </Col>
  );
};

export default Deck;
