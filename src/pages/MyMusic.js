import React from "react";

import PageContainer from "../components/containers/PageContainer";
import Header from "../components/mini-components/Header";
import SongListItem from "../components/mini-components/SongListItem";
import ListItemHeader from "../components/mini-components/ListItemHeader";
import ArtistListItem from "../components/mini-components/ArtistListItem";
import AlbumListItem from "../components/mini-components/AlbumListItem";

// third-party
import { useSelector } from "react-redux";
import {
  NavLink,
  useRouteMatch,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

function MyMusic() {
  return (
    <PageContainer>
      <div>
        <Header>My music</Header>
      </div>
      <div className="flex-grow-1 p-2" style={{ overflowY: "auto" }}>
        <div>
          <RenderTabs />
          <RenderFilters />
          <RenderTabContainers />
        </div>
      </div>
    </PageContainer>
  );
}

export default MyMusic;

function RenderFilters() {
  return (
    <div className="d-flex flex-row py-2">
      <div className="mr-3 small">Shuffle All</div>
      <div className="mr-3 small">Sort By: Album</div>
      <div className="mr-3 small">Genre: Telugu</div>
    </div>
  );
}

function RenderTabs() {
  const route = useRouteMatch();
  return (
    <div className="sticky-top bg-white">
      <div className="d-flex flex-row">
        <NavLink to={`${route.url}/songs`} activeClassName="tab-active">
          <div className="px-2 py-2 hand text-center">Songs</div>
        </NavLink>
        <NavLink to={`${route.url}/artists`} activeClassName="tab-active">
          <div className="px-2 py-2 hand">Artists</div>
        </NavLink>
        <NavLink to={`${route.url}/albums`} activeClassName="tab-active">
          <div className="px-2 py-2 hand">Albums</div>
        </NavLink>
      </div>
      <hr className="m-0" />
    </div>
  );
}

function RenderTabContainers() {
  const { allsongs, allartists, allalbums } = useSelector(
    state => state.mymusic
  );
  const route = useRouteMatch();
  return (
    <div className="h-100" style={{ overflowY: "auto" }}>
      <Switch>
        <Route path={`${route.url}/songs`}>
          <RenderSongs allsongs={allsongs} />
        </Route>
        <Route path={`${route.url}/artists`}>
          <RenderArtists allartists={allartists} />
        </Route>
        <Route path={`${route.url}/albums`}>
          <RenderAlbums allalbums={allalbums} />
        </Route>
        <Redirect to={`${route.url}/songs`} />
      </Switch>
    </div>
  );
}

function RenderSongs(props) {
  const { allsongs } = props;
  return (
    <div className="d-flex flex-column flex-wrap justify-content-start">
      {allsongs.map((album, index) => {
        let album_name = album.album_name;
        let album_released_year = album.album_released_year;
        let album_banner = album.album_picture;
        return (
          <React.Fragment key={index}>
            <ListItemHeader id={`${album_name}`}>
              {album_name} - {album_released_year}
            </ListItemHeader>
            {album.all_songs.map((song, index) => {
              let new_song = {
                ...song,
                song_album: album_name,
                song_banner: album_banner,
                song_released_year: album_released_year
              };
              return <SongListItem key={index} data={new_song} />;
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function RenderArtists(props) {
  const { allartists } = props;
  return (
    <div className="d-flex flex-row flex-wrap justify-content-center justify-content-sm-start">
      {allartists.map((artist, index) => {
        return <ArtistListItem key={index} data={artist} />;
      })}
    </div>
  );
}

function RenderAlbums(props) {
  const { allalbums } = props;
  return (
    <React.Fragment>
      <ListItemHeader as="h3">A</ListItemHeader>
      <div className="d-flex flex-row flex-wrap justify-content-center justify-content-sm-start">
        {allalbums.map((album, index) => {
          return <AlbumListItem key={index} data={album} />;
        })}
      </div>
    </React.Fragment>
  );
}
