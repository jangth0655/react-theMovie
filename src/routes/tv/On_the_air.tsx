import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { tvNowPlaying } from "../../actions/NowplayingAPIs";
import LoadingState from "../../components/LoadingState";
import { useAppDispatch, useAppSelector } from "../../store";
import makeImage from "../../utility/utility";

const Main = styled.main`
  padding: var(--padding-size-main);
`;

const TvTitle = styled.p`
  font-size: var(--font-size-large);
  padding: var(--padding-size-small);
  margin-bottom: var(--margin-size-meddle);
  @media screen and (max-width: 64em) {
    font-size: var(--font-size-large);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-regular);
    text-align: center;
  }
  color: ${(props) => props.theme.color.mainFontColor};
`;

const TvList = styled.ul`
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
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
    transform: translateY(-10px);
  }
`;

const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10em;
  margin-bottom: var(--margin-size-small);
  color: ${(props) => props.theme.color.mainFontColor};
`;

const ItemTitle = styled.p`
  width: 100%;
  font-weight: 600;
`;

const ItemDate = styled.p`
  margin-top: var(--margin-size-small);
  font-size: var(--font-size-micro);
  color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.color.mainFontColor};
`;

const VoteAverage = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.mainFontColor};
`;

const VoteAverageP = styled.p`
  margin-right: var(--margin-size-small);
`;

const VoteAverageScore = styled.p`
  text-align: center;
`;

const OnTheAir = () => {
  const navigator = useNavigate();
  const nowTvProgram = useAppSelector((state) => state.NowPlayingSlice.tvData);
  const loading = useAppSelector((state) => state.NowPlayingSlice.loadingState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(tvNowPlaying());
  }, [dispatch]);

  const onDetailPage = (id: number) => {
    navigator(`/tv-detail/${id}`);
  };

  return loading ? (
    <LoadingState />
  ) : (
    <Main>
      <TvTitle>?????? ?????? TV????????????</TvTitle>
      <TvList>
        {nowTvProgram.map((item) => (
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
              <VoteAverageP>??????</VoteAverageP>
              <VoteAverageScore>{item.vote_average}</VoteAverageScore>
            </VoteAverage>
          </TvItem>
        ))}
      </TvList>
    </Main>
  );
};

export default OnTheAir;
