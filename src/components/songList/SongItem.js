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
      className={`cursor-grab user-select-none ${
        isDragging ? "bg-light-alpha" : ""
      }`}
    >
      <td className="w-50">{title}</td>
      <td className="w-50">{artist}</td>
    </tr>
  );
};

export default Song;
