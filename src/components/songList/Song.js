import React from "react";

const Song = ({ title, artist, handleSongClick }) => {
  return (
    <tr onClick={handleSongClick} className="user-select-none">
      <td width="50%">{title}</td>
      <td width="50%">{artist}</td>
    </tr>
  );
};

export default Song;
