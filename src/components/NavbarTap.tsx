import { motion } from "framer-motion";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageTap, pageTap } from "./navigation";

const PageLi = styled(motion.li)`
  padding: 1.5em;
  position: relative;
  margin: auto;
  font-size: var(--font-size-micro);
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
  margin-left: -1px;
  border: 1px solid black;
  transform-origin: top center;
`;

const TapContents = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--padding-size-small) 0;
  font-size: var(--font-size-micro);
  color: black;
  &:hover {
    color: ${(props) => props.theme.color.whiteColor};
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const NavbarTap = memo(({ ...tap }: PageTap) => {
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
        navigate("movies/now-playing");
        break;
      case pageTap.TV:
        navigate("tvs/on-the-air");
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
        navigate("movies/up-coming");
        break;
      case pageTap.TV:
        navigate("tvs/airing-today");
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
});
export default NavbarTap;
