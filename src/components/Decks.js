import React, { useContext } from "react";
import Deck from "./deck/Deck";
import { DecksContext } from "../contexts/DecksContext";
import { Row } from "react-bootstrap";

const Decks = () => {
  const { deckAState, deckBState } = useContext(DecksContext);

  return (
    <Row>
      <Deck deckState={deckAState} />
      <Deck deckState={deckBState} />
    </Row>
  );
};

export default Decks;
