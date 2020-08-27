import React, {useContext} from "react";
import { Table } from "react-bootstrap";
import Song from "./Song";
import { SongsContext } from "../contexts/SongsContext";

const SongList = () => {

  // We get the filteredSongs array from SongsContext and map
  // each song in the table
  const {filteredSongs} = useContext(SongsContext)

  return (
    <Table striped hover variant="dark">
      <thead>
        <tr className="bg-dark-3">
          <th>Song</th>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody>
        {filteredSongs.map((song) => (
          <Song title={song.title} artist={song.artist} key={song.id} />
        ))}
      </tbody>
    </Table>
  );
};

export default SongList;
