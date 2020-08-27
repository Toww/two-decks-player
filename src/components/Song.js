import React from "react";

const Song = ({ title, artist, handleContextMenu }) => {
  return (
    <tr onClick={handleContextMenu} className="user-select-none">
      <td>{title}</td>
      <td>{artist}</td>
    </tr>
  );
};

export default Song;
