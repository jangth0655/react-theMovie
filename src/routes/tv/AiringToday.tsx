import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiringTodayAPIs } from "../../actions/AiringTodayAPIs";

import { useAppDispatch, useAppSelector } from "../../store";
import makeImage from "../../utility/utility";

const Main = styled.main`
  padding: var(--padding-size-main);
`;

const TvTitle = styled.p`
  font-size: var(--font-size-large);
  padding: var(--padding-size-small);
`;

const TvList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 0.5em;
`;

const TvItem = styled.li`
  padding: var(--padding-size-small);
`;

const ItemImage = styled.div<{ bgPoster: string }>`
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

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10em;
  margin-bottom: var(--margin-size-small);
`;

const ItemTitle = styled.p`
  width: 100%;
  font-weight: 600;
`;

const ItemDate = styled.p`
  margin-top: var(--margin-size-small);
  font-size: var(--font-size-micro);
  color: rgba(0, 0, 0, 0.5);
`;

const VoteAverage = styled.div`
  display: flex;
  align-items: center;
`;

const VoteAverageP = styled.p`
  margin-right: var(--margin-size-small);
`;

const VoteAverageScore = styled.p`
  text-align: center;
`;

const AiringToday = () => {
  const navigator = useNavigate();
  const airingTodayProgram = useAppSelector(
    (state) => state.AiringTodaySlice.tvData
  );
  const loading = useAppSelector(
    (state) => state.AiringTodaySlice.loadingState
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(AiringTodayAPIs());
  }, [dispatch]);

  console.log(airingTodayProgram);

  const onDetailPage = (id: number) => {
    navigator(`/tv/${id}`);
  };

  return (
    <Main>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <TvTitle>현재 방영 TV프로그램</TvTitle>
          <TvList>
            {airingTodayProgram.map((item) => (
              <TvItem key={item.id}>
                <ItemImage
                  onClick={() => onDetailPage(item.id)}
                  bgPoster={makeImage(item.poster_path)}
                ></ItemImage>
                <ItemDescription>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemDate>{item.first_air_date}</ItemDate>
                </ItemDescription>
                <VoteAverage>
                  <VoteAverageP>평점</VoteAverageP>
                  <VoteAverageScore>{item.vote_average}</VoteAverageScore>
                </VoteAverage>
              </TvItem>
            ))}
          </TvList>
        </>
      )}
    </Main>
  );
};

export default AiringToday;
