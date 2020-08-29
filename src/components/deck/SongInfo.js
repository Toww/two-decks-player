import React from "react";

const SongInfo = ({ loadedSong, textAlign }) => {
  // Set default song information if there is no loaded song
  const defaultInfo = { title: "-", artist: "Please load a song" };
  const songInfo = loadedSong ? loadedSong : defaultInfo;

  return (
    <div
      className={`bg-dark-3 p-2 d-flex flex-column justify-content-center ${textAlign}`}
    >
      <h1 className="m-0 font-weight-bold">{songInfo.title}</h1>
      <h2 className="m-0">{songInfo.artist}</h2>
    </div>
  );
};

export default SongInfo;
