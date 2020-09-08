import React from "react";
import "./styles/main.scss";
import Layout from "./components/Layout";
import Decks from "./components/Decks";
import SongList from "./components/songList/SongList";
import SearchBar from "./components/SearchBar";
import SongsContextProvider from "./contexts/SongsContext";

function App() {
  return (
    <div className="App">
      <Layout>
        <Decks />
        <SongsContextProvider>
          <SearchBar />
          <SongList />
        </SongsContextProvider>
      </Layout>
    </div>
  );
}

export default App;
