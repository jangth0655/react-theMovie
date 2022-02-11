import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/firebase";
import { isLogout } from "../slices/IsLoginSlice";
import { useAppDispatch, useAppSelector } from "../store";
import NavbarTap from "./NavbarTap";

const Navbar = styled.nav`
  z-index: 1;
  padding: 0 1em;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.color.darkColor};
  color: ${(props) => props.theme.color.whiteColor};
`;

const ColOne = styled.div`
  display: flex;
  align-items: center;
  flex: 40%;
`;

const ColTwo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 60%;
`;

const Logo = styled(motion.svg)`
  cursor: pointer;
  color: ${(props) => props.theme.color.active};
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.8em;
`;

const Name = styled.div`
  & span {
    font-size: var(--font-size-micro);
  }
`;

const Page = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 70%;
`;

const LoginBtn = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: ${(props) => props.theme.color.whiteColor};
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const logoVariants = {
  end: {
    opacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

export enum pageTap {
  Movie = "Movie",
  TV = "TV",
  Actor = "Actor",
}

const tapContents = [
  { id: pageTap.Movie, one: "현재 상영", two: "계봉 예정" },
  { id: pageTap.TV, one: "현재 방영", two: "오늘 방영" },
  { id: pageTap.Actor, one: "인기 배우" },
];

const Nav = () => {
  const login = useAppSelector((state) => state.IsLoginSlice.isLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    signOut(auth);
    dispatch(isLogout(false));
  };

  const goHomePage = () => {
    navigate("/");
  };

  return (
    <Navbar>
      <ColOne>
        <Logo
          onClick={goHomePage}
          variants={logoVariants}
          whileHover="end"
          focusable="false"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
          ></path>
        </Logo>
        <Name>
          <span>The Movie</span>
        </Name>
      </ColOne>
      <ColTwo>
        <Page>
          {tapContents.map((tap, i) => (
            <NavbarTap key={i} {...tap} />
          ))}
        </Page>
        {login && <LoginBtn onClick={onLogout}>Logout</LoginBtn>}
      </ColTwo>
    </Navbar>
  );
};
export default Nav;
