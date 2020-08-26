import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Deck = ({ rightSide }) => {
  
  // Defining deck details depending on its side
  const deckDetails =
    rightSide === true
      ? {
          name: "B",
          flexDirection: "flex-row-reverse",
          textAlign: "text-right",
        }
      : {
          name: "A",
          flexDirection: "flex-row",
          textAlign: "text-left",
        };

  return (
    <Col className="">
      <div className="deck p-3">
        <Row className={deckDetails.flexDirection}>
          <Col md={8}>
            <div
              className={`h-100 d-flex flex-column justify-content-between ${deckDetails.textAlign}`}
            >
              <div
                className={`bg-black p-2 d-flex flex-column justify-content-center ${deckDetails.textAlign}`}
              >
                <h1>Song title</h1>
                <h2>Artist</h2>
              </div>
              <div className="m-0">
                <FontAwesomeIcon
                  icon={faPlayCircle}
                  className="my-2"
                  size="2x"
                />
              </div>
              <div className="m-0 align-bottom font-weight-bold">
                {deckDetails.name}
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="deck-disc">
              <div className="abs-container">
                <div className="rel-container">
                  <div className="marker"></div>
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
