import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Nav from "./components/navigation";
import Actors from "./routes/actors/Actors";
import Auth from "./routes/Auth";
import Home from "./routes/Home";
import NowMovie from "./routes/movies/NowMovie";
import UpComing from "./routes/movies/UpComing";
import AiringToday from "./routes/tv/Airing_today";
import OnTheAir from "./routes/tv/On_the_air";
import { useAppSelector } from "./store";

function App() {
  const login = useAppSelector((state) => state.IsLoginSlice.isLogin);
  return (
    <Router>
      <Nav />
      <Routes>
        {login ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="movies/nowPlaying" element={<NowMovie />} />
            <Route path="movies/upComing" element={<UpComing />} />
            <Route path="tv/airingToday" element={<AiringToday />} />
            <Route path="tv/onTheAir" element={<OnTheAir />} />
            <Route path="actors" element={<Actors />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

/* 
    <Route path="/movies/nowPlaying" element={<NowMovie />} />
        <Route path="/movies/upComing" element={<UpComing />} />
        <Route path="/tv/airingToday" element={<AiringToday />} />
        <Route path="/tv/onTheAir" element={<OnTheAir />} />
        <Route path="/actors" element={<Actors />} />
*/
