import React from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Deck = () => {
  return (
    <Col className="">
      <div className="deck p-3">
        <Row>
          <Col md={8}>
            <div className="h-100 d-flex flex-column justify-content-between ">
              <div className="bg-black p-2 d-flex flex-column justify-content-center">
                <h1>Song title</h1>
                <h2>Artist</h2>
              </div>
              <div className="m-0">
                <FontAwesomeIcon icon={faPlayCircle} size="2x" />
              </div>
              <div className="m-0 align-bottom font-weight-bold">A</div>
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
