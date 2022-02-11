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
import MovieDetail from "./routes/movies/MovieDetail";
import NowMovie from "./routes/movies/NowMovie";
import UpComing from "./routes/movies/UpComing";
import Search from "./routes/Search";
import AiringToday from "./routes/tv/AiringToday";
import OnTheAir from "./routes/tv/On_the_air";
import TVDetail from "./routes/tv/TVDetail";
import { useAppSelector } from "./store";

function App() {
  const login = useAppSelector((state) => state.IsLoginSlice.isLogin);
  return (
    <Router>
      <Nav />
      <Routes>
        {login ? (
          <>
            {/* movie */}
            <Route path="/" element={<Home />}></Route>
            <Route path="movies/now-playing" element={<NowMovie />} />
            <Route path="movies/up-coming" element={<UpComing />} />
            <Route path="movie-detail/:id" element={<MovieDetail />} />
            {/* tv */}
            <Route path="tvs/airing-today" element={<AiringToday />} />
            <Route path="tvs/on-the-air" element={<OnTheAir />} />
            <Route path="tv-detail/:id" element={<TVDetail />} />
            <Route path="search" element={<Search />} />
            <Route />
            {/* actors */}
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

/* Home page에서 firebase를 통해 로그인을 하면 login 불린 값이 true설정되며 리덕스로 관리가 됩니다. 하지만 기타 다른 페이지로 이동하고 나서 새로고침을 하게되면 login 값이 다시 false로 변경되여 
router가 경로를 match하지 못하게 된다는 이슈가 있었습니다. 이를 위해 Home page로 리다이렉트 하여 
해결하였습니다.
*/
