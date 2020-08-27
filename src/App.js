import React from "react";
import "./styles.scss";
import { Row } from "react-bootstrap";
import Layout from "./components/Layout";
import Deck from "./components/Deck";
import SongList from "./components/SongList";
import SearchBar from "./components/SearchBar";
import SongsContextProvider from "./contexts/SongsContext";

function App() {
  return (
    <div className="App">
      <Layout>
        <Row>
          <Deck />
          <Deck rightSide={true} />
        </Row>
        <SongsContextProvider>
          <SearchBar />
          <SongList />
        </SongsContextProvider>
      </Layout>
    </div>
  );
}

export default App;
