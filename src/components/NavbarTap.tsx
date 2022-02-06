import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../store";

interface ITapContents {
  id: string;
  one: string;
  two?: string;
}

const PageLi = styled(motion.li)`
  position: relative;
  margin: auto;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const PageName = styled(motion.p)``;

const TapBox = styled(motion.div)`
  background-color: ${(props) => props.theme.color.whiteColor};
  position: absolute;
  width: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5em;
  border: 1px solid black;
  border-radius: 10px;
  transform-origin: top center;
  & hr {
    width: 80%;
  }
`;

const TapContents = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.5em;
  font-size: 0.875rem;
  color: black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NavbarTap = ({ ...tap }: ITapContents) => {
  const [showingContents, setShowingContents] = useState(false);
  const navigate = useNavigate();
  const login = useAppSelector((state) => state.IsLoginSlice.isLogin);
  const onTap = () => {
    setShowingContents(true);
  };
  const onHoverEnd = () => {
    setShowingContents(false);
  };

  const onNavigate = () => {
    navigate("movies/nowPlaying");
  };
  return (
    <PageLi onHoverStart={onTap}>
      <PageName>{tap.id}</PageName>
      {showingContents ? (
        <TapBox
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: "tween" }}
        >
          <TapContents>
            <Link to="movies/nowPlaying">{tap.one}</Link>
          </TapContents>

          <TapContents>{tap.two ? tap.two : null}</TapContents>
        </TapBox>
      ) : null}
    </PageLi>
  );
};

export default NavbarTap;
