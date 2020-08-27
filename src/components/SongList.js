import React from "react";
import { Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid"; // Using uuid to generate a unique id for each song
import Song from "./Song";

const SongList = () => {
  const songs = [
    { id: uuidv4(), artist: "Notorious B.I.G", title: "It Was All A Dream" },
    { id: uuidv4(), artist: "2Pac", title: "California Love" },
  ];

  return (
    <Table striped hover variant="dark">
      <thead>
        <tr className="bg-dark-3">
          <th>Song</th>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song) => (
          <Song title={song.title} artist={song.artist} key={song.id} />
        ))}
      </tbody>
    </Table>
  );
};

export default SongList;
