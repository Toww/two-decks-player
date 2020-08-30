import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { DecksContext } from "../../contexts/DecksContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useDrop } from "react-dnd";

const DropZone = ({ deckName }) => {
  // Get function to load song to chosen deck
  const { loadDeck } = useContext(DecksContext);

  // Load song on drop
  const handleDrop = () => {
    loadDeck(deckName);
  };

  //React-dnd setup for drop
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "song",
    drop: () => handleDrop(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    // When a song starts to be hovered, show drop possibilities.
    // when song is dragged over the drop zone, change icon and border
    <Row ref={dropRef} style={{ display: canDrop ? "block" : "none" }}>
      <Col className="col-overlay">
        <div
          className="overlay-content"
          style={{
            border: isOver
              ? "3px solid #FFFFFF"
              : "2px dashed rgba(255,255,255,0.8)",
          }}
        >
          <div
            className="drop-icon-container"
            style={{
              border: isOver
                ? "1px dashed rgba(255,255,255,1)"
                : "1px dashed rgba(255,255,255,0.6)",
            }}
          >
            {isOver ? (
              <FontAwesomeIcon icon={faPlay} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faHandRock} size="2x" />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DropZone;