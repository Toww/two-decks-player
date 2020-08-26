import React from "react";
import "./styles.scss";
import { Row } from "react-bootstrap";
import Layout from "./components/Layout";
import Deck from "./components/Deck";

function App() {
  return (
    <div className="App">
      <Layout>
        <Row>
          <Deck />
          <Deck rightSide={true}/>
        </Row>
      </Layout>
    </div>
  );
}

export default App;
