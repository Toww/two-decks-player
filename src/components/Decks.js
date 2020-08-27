import React, { useContext } from "react";
import Deck from "./Deck";
import { DecksContext } from "../contexts/DecksContext";
import { Row } from "react-bootstrap";

const Decks = () => {
  const { deckAState, deckBState } = useContext(DecksContext);

  return (
    <Row>
      <Deck deckObj={deckAState} />
      <Deck deckObj={deckBState} />
    </Row>
  );
};

export default Decks;
