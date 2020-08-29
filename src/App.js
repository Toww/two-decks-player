import React from "react";
import "./styles.scss";
import Layout from "./components/Layout";
import Decks from "./components/Decks";
import SongList from "./components/songList/SongList";
import SearchBar from "./components/SearchBar";
import SongsContextProvider from "./contexts/SongsContext";
import DecksContextProvider from "./contexts/DecksContext";

function App() {
  return (
    <div className="App">
      <Layout>
        <DecksContextProvider>
          <Decks />
          <SongsContextProvider>
            <SearchBar />
            <SongList />
          </SongsContextProvider>
        </DecksContextProvider>
      </Layout>
    </div>
  );
}

export default App;
