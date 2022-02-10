import { useEffect } from "react";

import styled from "styled-components";
import { ActorAPIs } from "../../actions/ActorPopularAPIs";
import { useAppDispatch, useAppSelector } from "../../store";
import makeImage from "../../utility/utility";

const Main = styled.main`
  padding: var(--padding-size-main);
`;

const MainTitle = styled.p`
  font-size: var(--font-size-large);
  padding: var(--padding-size-small);
`;

const ActorList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 0.5em;
`;

const ActorLi = styled.li`
  padding: var(--padding-size-small);
`;

const ActorImage = styled.div<{ bgPoster: string }>`
  cursor: pointer;
  width: var(--image-width);
  height: var(--image-height);
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius);
  margin-bottom: var(--margin-size-small);
`;

const ActorDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10em;
  margin-bottom: var(--margin-size-small);
`;

const ActorName = styled.p`
  width: 100%;
  font-weight: 600;
`;

const Actors = () => {
  const dispatch = useAppDispatch();
  const actors = useAppSelector((state) => state.ActorSlice.actorData);
  const loading = useAppSelector((state) => state.ActorSlice.loadingState);
  useEffect(() => {
    dispatch(ActorAPIs());
  }, [dispatch]);

  return (
    <Main>
      {loading ? (
        "loading..."
      ) : (
        <>
          <MainTitle>인기배우</MainTitle>
          <ActorList>
            {actors.map((actor) => (
              <ActorLi key={actor.id}>
                <ActorImage
                  bgPoster={makeImage(actor.profile_path)}
                ></ActorImage>
                <ActorDescription>
                  <ActorName>{actor.name}</ActorName>
                </ActorDescription>
              </ActorLi>
            ))}
          </ActorList>
        </>
      )}
    </Main>
  );
};

export default Actors;
