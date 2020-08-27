import React from "react";

const Song = ({ title, artist, handleSongClick }) => {
  return (
    <tr onClick={handleSongClick} className="user-select-none">
      <td>{title}</td>
      <td>{artist}</td>
    </tr>
  );
};

export default Song;
