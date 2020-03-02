import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdPlayCircleFilled, MdAddCircle } from "react-icons/md";

function ArtistListItem(props) {
  const { artist_picture, artist_name } = props.data;
  const [show, setShow] = useState(false);
  const bg = {
    width: "150px",
    height: "150px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${artist_picture})`
  };

  return (
    <Link
      to="/artist/124/detail"
      className="d-flex flex-column align-items-center justify-content-center p-2"
    >
      <div
        className={`rounded-circle position-relative${show ? " shadow" : ""}`}
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
      <strong>{artist_name}</strong>
    </Link>
  );
}

export default ArtistListItem;
