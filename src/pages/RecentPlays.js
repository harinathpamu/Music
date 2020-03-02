import React from "react";

import PageContainer from "../components/containers/PageContainer";
import Header from "../components/mini-components/Header";
// import Album from "../components/mini-components/AlbumListItem";

function RecentPlays() {
  return (
    <PageContainer>
      <Header>Recent Plays</Header>
      <div className="flex-grow-1" style={{ overflowY: "auto" }}>
        <div className="d-flex flex-row flex-wrap justify-content-center justify-content-sm-start">
          {/* <Album />
          <Album />
          <Album />
          <Album />
          <Album /> */}
        </div>
      </div>
    </PageContainer>
  );
}

export default RecentPlays;
