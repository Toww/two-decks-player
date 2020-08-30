import React, { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { SongsContext } from "../../contexts/SongsContext";
import { DecksContext } from "../../contexts/DecksContext";
import Song from "./Song";
import ContextMenu from "./ContextMenu";

const SongList = () => {
  // Get states and functions for songs and decks using Context.
  const { filteredSongs, getSongById } = useContext(SongsContext);
  const { setSongToLoad } = useContext(DecksContext);

  // State to tell contextMenu where click on the song was made
  const [songClickPosState, setsongClickPosState] = useState(null);

  const handleSongClick = (e, songId) => {
    // Setting the songClickPosState to display context menu near mouse click
    // in context menu component
    setsongClickPosState({ pageX: e.pageX, pageY: e.pageY });
    // Preparing the song that will be loaded if click on the Deck A or B.
    setSongToLoad(getSongById(songId));
  };

  const handleSongDrag = (songId) => {
    // Preparing the song that will be loaded if click on the Deck A or B.
    setSongToLoad(getSongById(songId));
  };

  return (
    <>
      <ContextMenu
        songClickPosState={songClickPosState}
        setsongClickPosState={setsongClickPosState}
      />

      {/* SongList Table */}
      <Table hover variant="dark">
        <thead>
          <tr className="bg-dark-3">
            <th>Song</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {filteredSongs.map((song) => (
            <Song
              title={song.title}
              artist={song.artist}
              key={song.id}
              handleSongClick={(e) => handleSongClick(e, song.id)}
              handleSongDrag={() => handleSongDrag(song.id)}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default SongList;
