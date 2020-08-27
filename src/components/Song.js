import React from "react";

const Song = ({ title, artist }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{artist}</td>
    </tr>
  );
};

export default Song;
