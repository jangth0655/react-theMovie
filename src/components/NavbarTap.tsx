import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { pageTap } from "./navigation";

interface ITapContents {
  id: string;
  one: string;
  two?: string;
}

const PageLi = styled(motion.li)`
  padding: 1.2em;
  position: relative;
  margin: auto;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const PageName = styled.p``;

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
  const onTap = () => {
    setShowingContents(true);
  };
  const onHoverEnd = () => {
    setShowingContents(false);
  };

  const onNavigateOne = (one: string) => {
    switch (one) {
      case pageTap.Movie:
        navigate("movies/nowPlaying");
        break;
      case pageTap.TV:
        navigate("tv/onTheAir");
        break;
      case pageTap.Actor:
        navigate("actors");
        break;
      default:
        navigate("/");
    }
  };
  const onNavigateTwo = (two: string) => {
    switch (two) {
      case pageTap.Movie:
        navigate("movies/upComing");
        break;
      case pageTap.TV:
        navigate("tv/airingToday");
        break;
      default:
        navigate("/");
    }
  };
  return (
    <PageLi onHoverStart={onTap} onHoverEnd={onHoverEnd}>
      <PageName>{tap.id}</PageName>
      {showingContents && (
        <TapBox
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: "tween" }}
        >
          <TapContents onClick={() => onNavigateOne(tap.id)}>
            {tap.one}
          </TapContents>

          {tap.two && (
            <TapContents onClick={() => onNavigateTwo(tap.id)}>
              {tap.two && tap.two}
            </TapContents>
          )}
        </TapBox>
      )}
    </PageLi>
  );
};
export default NavbarTap;
