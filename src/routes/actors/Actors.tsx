import { useEffect } from "react";

import styled from "styled-components";
import { ActorAPIs } from "../../actions/ActorPopularAPIs";
import LoadingState from "../../components/LoadingState";
import { useAppDispatch, useAppSelector } from "../../store";
import makeImage from "../../utility/utility";

const Main = styled.main`
  padding: var(--padding-size-main);
`;

const MainTitle = styled.p`
  font-size: var(--font-size-large);
  padding: var(--padding-size-small);
  margin-bottom: var(--margin-size-meddle);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-regular);
    text-align: center;
  }
`;

const ActorList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 0.5em;
  @media screen and (max-width: 48em) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ActorLi = styled.li`
  width: 10em;
  -webkit-box-shadow: 0px 5px 9px 0px #000000;
  box-shadow: 0px 5px 9px 0px #000000;
  border-radius: var(--border-radius);
  margin-bottom: var(--margin-size-small);
`;

const ActorImage = styled.div<{ bgPoster: string }>`
  width: 100%;
  width: var(--image-width);
  height: var(--image-height);
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  margin-bottom: var(--margin-size-small);
`;

const ActorDescription = styled.div`
  padding: var(--padding-size-small);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: var(--margin-size-small);
`;

const ActorName = styled.p`
  width: 100%;
  font-weight: 600;
  font-size: var(--font-size-micro);
`;

const ActorKnownForBox = styled.ul`
  margin-top: var(--margin-size-small);
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
`;

const ActorKnownFor = styled.li`
  width: fit-content;
  display: flex;
  font-size: var(--font-size-micro);
  color: rgba(0, 0, 0, 0.6);
`;

const Actors = () => {
  const dispatch = useAppDispatch();
  //const errors = useAppSelector((state) => state.ActorSlice.error);
  const actors = useAppSelector((state) => state.ActorSlice.actorData);
  const loading = useAppSelector((state) => state.ActorSlice.loadingState);
  useEffect(() => {
    dispatch(ActorAPIs());
  }, [dispatch]);

  return loading ? (
    <LoadingState></LoadingState>
  ) : (
    <Main>
      <MainTitle>인기배우</MainTitle>
      <ActorList>
        {actors.map((actor) => (
          <ActorLi key={actor.id}>
            <ActorImage bgPoster={makeImage(actor.profile_path)}></ActorImage>
            <ActorDescription>
              <ActorName>{actor.name}</ActorName>
              <ActorKnownForBox>
                {actor.known_for.slice(0, 1).map((item) => (
                  <ActorKnownFor key={item.id}>
                    {item.title ? `${item.title}...` : ""}
                  </ActorKnownFor>
                ))}
              </ActorKnownForBox>
            </ActorDescription>
          </ActorLi>
        ))}
      </ActorList>
    </Main>
  );
};

export default Actors;
