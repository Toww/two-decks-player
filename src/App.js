import React from "react";
import "./styles.scss";
import { Row } from "react-bootstrap";
import Layout from "./components/Layout";
import Deck from "./components/Deck";
import SongList from "./components/SongList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <Layout>
        <Row>
          <Deck />
          <Deck rightSide={true}/>
        </Row>
        <SearchBar />
        <SongList />
      </Layout>
    </div>
  );
}

export default App;
