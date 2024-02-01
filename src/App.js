import { Route, Routes, useHistory } from "react-router-dom";
import Layout from "src/components/Layout/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Collection,
  Filters,
  Home,
  MovieDetail,
  NotFound,
  Movie,
  Tv,
  Search,
  TvDetail,
  TrendingWeek,
  TrendingDay,
  TvSeason,
} from "./pages";
import { getConfig, getGenres } from "./services/";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      getConfig({
        path: "configuration",
      })
    );
    dispatch(
      getGenres({
        path: "genre/movie/list",
        type: 'movie'
      })
    );
    dispatch(
      getGenres({
        path: "genre/tv/list",
        type: 'tv'
      })
    );
  }, []);

  const handleLinkClick = (event) => {
    const { target } = event;
    // Check if the clicked link is external
    if (target.tagName === "A" && !target.origin === window.location.origin) {
      // Prevent the default behavior (external navigation)
      event.preventDefault();
      // Handle internal navigation
      history.push(target.pathname);
    }
  };

  useEffect(() => {
    // Attach the event listener to the document
    document.addEventListener("click", handleLinkClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [history]);

  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />

        <Route exact path="/movie" element={<Movie />} />
        <Route exact path="/movie/popular" element={<Movie type='popular' />} />
        <Route exact path="/movie/now-playing" element={<Movie type='now_playing' />} />
        <Route exact path="/movie/upcoming" element={<Movie type='upcoming' />} />
        <Route exact path="/movie/top-rated" element={<Movie type='top_rated' />} />
        <Route exact path="/movie/:id" element={<MovieDetail />} />

        <Route exact path="/tv" element={<Tv />} />
        <Route exact path="/tv/popular" element={<Tv type='popular' />} />
        <Route exact path="/tv/airing-today" element={<Tv type='airing_today' />} />
        <Route exact path="/tv/on-the-air" element={<Tv type='on_the_air' />} />
        <Route exact path="/tv/top-rated" element={<Tv type='top_rated' />} />
        <Route exact path="/tv/:id" element={<TvDetail />} />
        <Route exact path="/tv/:id/season/:seasonId" element={<TvSeason />} />

        <Route exact path="/trending/week" element={<TrendingWeek />} />
        <Route exact path="/trending/day" element={<TrendingDay />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
