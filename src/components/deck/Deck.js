import React from "react";
import { Row, Col } from "react-bootstrap";
import DeckDisc from "components/deck/DeckDisc";
import SongInfo from "components/deck/SongInfo";
import AudioPlayer from "components/deck/audioPlayer/AudioPlayer";
import DropZone from "components/deck/DropZone";

const Deck = ({ deckState }) => {
  const { loadedSong, isPlaying, layout, deckName } = deckState;

  return (
    <Col xs={6}>
      <div className="p-0 p-md-3 bg-light-gray">
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
              <div className="d-none d-lg-block m-0 align-bottom font-weight-bold">
                {deckName}
              </div>
            </div>
          </Col>
          {/* Deck Disc */}
          <Col md={4} className="mx-2 mb-3 m-md-0">
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
