import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { isLogout } from "../slices/IsLoginSlice";
import { useAppDispatch } from "../store";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onLogout = () => {
    signOut(auth);
    navigate("/");
    dispatch(isLogout(false));
  };

  return (
    <>
      <h1>Nav</h1>
      <button onClick={onLogout}>Logout</button>
      <Link to="/movies/nowPlaying">Movies</Link>
    </>
  );
};
export default Nav;
