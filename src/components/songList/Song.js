import React from "react";
import { useDrag } from "react-dnd";

const Song = ({ title, artist, handleSongClick, handleSongDrag }) => {
  // React-dnd setup for drag
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: "song",
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <tr
      ref={dragRef}
      onClick={handleSongClick}
      onDragStart={handleSongDrag}
      className="cursor-pointer user-select-none"
      style={{
        backgroundColor: isDragging ? "rgba(255,255,255,0.2" : "",
      }}
    >
      <td width="50%">{title}</td>
      <td width="50%">{artist}</td>
    </tr>
  );
};

export default Song;
