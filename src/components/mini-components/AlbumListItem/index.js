import React, { useState } from "react";

import { Link } from "react-router-dom";

import { MdPlayCircleFilled, MdAddCircle } from "react-icons/md";

function AlbumListItem(props) {
  const {
    album_name,
    album_picture,
    album_artist,
    album_released_year
  } = props.data;
  const [show, setShow] = useState(false);
  const bg = {
    width: "150px",
    height: "150px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${album_picture})`
  };

  return (
    <Link
      className="d-flex flex-column justify-content-center p-2"
      to="/album/123/detail"
    >
      <div
        className={`position-relative${show ? " shadow" : ""}`}
        style={bg}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {show && (
          <div className="d-flex flex-row align-items-center justify-content-center position-absolute h-100 w-100">
            <MdPlayCircleFilled
              className="mx-1 hand filled"
              color="#fff"
              size="40px"
            />
            <MdAddCircle
              className="mx-1 filled hand"
              color="#fff"
              size="40px"
            />
          </div>
        )}
      </div>
      <strong>
        {album_name} - {album_released_year}
      </strong>
      <span className="small light hand">{album_artist}</span>
    </Link>
  );
}

export default AlbumListItem;
