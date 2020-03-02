import React from "react";

import { MdPlayArrow, MdAdd, MdPerson } from "react-icons/md";

import PageContainer from "../components/containers/PageContainer";
import Header from "../components/mini-components/Header";
import SongListItem from "../components/mini-components/SongListItem";

function Detail(props) {
  const { type } = props;
  return (
    <PageContainer>
      <div className="d-block d-md-none">
        <Header></Header>
      </div>
      <div className="d-flex flex-column h-100 p-2">
        <div>
          <div className="d-flex flex-column position-relative">
            <div className="d-flex flex-row flex-wrap justify-content-center p-2">
              <div className="mb-1">
                <img
                  className={`shadow p-1 img-fluid${
                    type === "artist" ? " rounded-circle" : ""
                  }`}
                  style={{ maxWidth: "200px" }}
                  src="https://content.hungama.com/audio%20album/display%20image/300x300%20jpeg/5060144069.jpg"
                  alt="album"
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex flex-column align-items-center align-items-sm-start h-100 justify-content-between pl-2">
                  <div className="d-flex flex-column align-items-center align-items-sm-start text-dark">
                    <h4 className="m-0 light">D for Dopidi (2013)</h4>
                    <span>Sachin Jigar & Mahesh Shanker</span>
                    <span>2013 | Telugu | 1 song</span>
                  </div>
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <span className="d-flex small align-items-center hand hbg rounded-pill px-1 py-1">
                      <MdPlayArrow size="25px" color="#000" />
                      <span className="d-none d-sm-block p-1">Play all</span>
                    </span>
                    <span className="d-flex small align-items-center hand hbg rounded-pill px-1 py-1">
                      <MdAdd size="25px" color="#000" />
                      <span className="d-none d-sm-block p-1">Add to</span>
                    </span>
                    <span className="d-flex small align-items-center hand hbg rounded-pill px-1 py-1">
                      <MdPerson size="25px" color="#000" />
                      <span className="d-none d-sm-block p-1">Show artist</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1 p-2" style={{ overflowY: "auto" }}>
          {/* {Array(30)
          .fill(0)
          .map((_, index) => {
            return <SongListItem key={index} />;
          })} */}
          <h6>{type === "artist" ? "Artist Songs" : "Album Songs"}</h6>
        </div>
      </div>
    </PageContainer>
  );
}

export default Detail;

//  <div
// className="position-absolute"
// style={{
//   backgroundImage:
//     "url('https://content.hungama.com/audio%20album/display%20image/300x300%20jpeg/5060144069.jpg')",
//   backgroundSize: "cover",
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   zIndex: -1,
//   filter: "blur(1px)"
// }}
// ></div>
