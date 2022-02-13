import { useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TvDetailPagesAPI } from "../../actions/DetailPage";
import { useAppDispatch, useAppSelector } from "../../store";
import makeImage, { playVideo } from "../../utility/utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { getTvVideo } from "../../actions/Video";
import NoItems from "../../components/Noiitem";
import { TvRecommendation } from "../../actions/RecommendationAPIs";
import LoadingState from "../../components/LoadingState";

const Main = styled.main``;

const SectionOne = styled.section<{ background: string }>`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
    height: 70vh;
  }
`;

const Cover = styled.div`
  padding: 6em 3em 3em 3em;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`;

const TvIntro = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media screen and (max-width: 48em) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const TvPoster = styled(motion.div)`
  margin-right: var(--margin-size-meddle);
  flex: 30%;
  width: 18em;
  height: 31.25em;
  @media screen and (max-width: 48em) {
    flex: 40%;
  }
`;

const PosterImg = styled.div<{ poster: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.poster});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius);
`;

const TvDescription = styled.div`
  flex: 70%;
  @media screen and (max-width: 48em) {
    flex: 60%;
  }
`;

const TvTitle = styled.div`
  color: ${(props) => props.theme.color.whiteColor};
`;

const Title = styled.p`
  font-weight: 600;
  color: ${(props) => props.theme.color.yellowColor};
  font-size: var(--font-size-large);
  margin-bottom: var(--margin-size-small);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-regular);
  }
`;

const TitleSubInfo = styled.div`
  margin-bottom: var(--margin-size-meddle);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
  }
`;

const Release = styled.p`
  margin-bottom: var(--margin-size-small);
`;

const GenresArray = styled.div`
  display: flex;
`;
const Genres = styled.p`
  margin-bottom: var(--margin-size-small);
  margin-right: var(--margin-size-small);
`;

const Runtime = styled.p``;

const VoteAverage = styled.div`
  margin-bottom: var(--margin-size-large);
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.color.whiteColor};
`;

const VoteAverageP = styled.p`
  margin-right: var(--margin-size-small);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
  }
`;

const VoteAverageScore = styled.div`
  padding: 0.5em;
  width: fit-content;
  border: 2px solid ${(props) => props.theme.color.main};
  border-radius: 50%;
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
  }
`;

const OverView = styled.p`
  width: 60%;
  line-height: 1.4;
  color: ${(props) => props.theme.color.whiteColor};
  font-size: var(--font-size-small);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
  }
`;

const TvTrailer = styled.div`
  display: flex;
  color: ${(props) => props.theme.color.whiteColor};
  margin-top: var(--margin-size-large);
  font-size: var(--font-size-regular);
`;

const Trailer = styled.p`
  margin-right: var(--margin-size-small);
`;

const TrailerPlay = styled(motion.div)`
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const OverLay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const PlayVideoBox = styled(motion.div)`
  width: 35em;
  height: 30em;
  border-radius: var(--border-radius);
  background-color: black;
  color: white;
  @media screen and (max-width: 48em) {
    width: 30em;
    height: 25em;
  }
`;

// section two
const SectionTwo = styled.section`
  padding: 3em;
`;

const Recommendation = styled.div`
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
  }
`;

const RecommendationName = styled.p`
  font-size: var(--font-size-large);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-regular);
  }
  color: ${(props) => props.theme.color.mainFontColor};
`;

const RecommendationList = styled.ul`
  display: flex;
  overflow-x: scroll;
`;

const RecommendationDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10em;
`;

const RecommendationTitle = styled.p`
  width: 100%;
  font-weight: 600;
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-small);
  }
  color: ${(props) => props.theme.color.mainFontColor};
`;

const RecommendationItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: var(--margin-size-meddle);
  padding: 2em 0;
`;

const RecommendationItemImage = styled.div<{ bgPoster: string }>`
  cursor: pointer;
  width: 10em;
  height: 15em;
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius);
  margin-bottom: var(--margin-size-small);
`;

const TVDetails = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const navigator = useNavigate();
  const RecommendationItems = useAppSelector(
    (state) => state.RecommendationSlice.tvData
  );
  const [play, setPlay] = useState(false);
  const tvMatch = useMatch("tv-detail/:id");
  const dispatch = useAppDispatch();
  const tvVideo = useAppSelector((state) => state.VideoSlice.tvData);
  const tvDetailItem = useAppSelector((state) => state.Details.TvDetails);
  const loading = useAppSelector((state) => state.Details.loadingState);
  useEffect(() => {
    dispatch(TvDetailPagesAPI(Number(tvMatch?.params.id)));
    dispatch(getTvVideo(Number(tvMatch?.params.id)));
    dispatch(TvRecommendation(Number(tvMatch?.params.id)));
  }, [dispatch, tvMatch?.params.id]);

  const onVideoPlay = () => {
    setPlay(true);
  };

  const OffVideoPlay = () => {
    setPlay(false);
  };

  const onDetailPage = (id: number) => {
    navigator(`/tv-detail/${id}`);
    titleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  };

  return loading ? (
    <LoadingState />
  ) : (
    <Main>
      <SectionOne background={makeImage(tvDetailItem?.poster_path)}>
        <Cover>
          <TvIntro>
            <TvPoster layoutId={tvMatch?.params.id}>
              <PosterImg
                poster={makeImage(tvDetailItem.poster_path)}
              ></PosterImg>
            </TvPoster>
            <TvDescription>
              <TvTitle>
                <Title ref={titleRef}>{tvDetailItem.original_name}</Title>
                <TitleSubInfo>
                  <Release>{`${tvDetailItem.first_air_date} ~ ${tvDetailItem.last_air_date}`}</Release>
                  <GenresArray>
                    {tvDetailItem?.genres?.map((genre) => (
                      <Genres key={genre.id}>{genre.name}</Genres>
                    ))}
                  </GenresArray>
                  <Runtime>{`Episode Time : ${tvDetailItem.episode_run_time?.map(
                    (time) => `${time}분 `
                  )}`}</Runtime>
                </TitleSubInfo>
              </TvTitle>
              <VoteAverage>
                <VoteAverageP>평점</VoteAverageP>
                <VoteAverageScore>{tvDetailItem.vote_average}</VoteAverageScore>
              </VoteAverage>
              {tvDetailItem.overview ? (
                <OverView>{`${tvDetailItem.overview.slice(
                  0,
                  120
                )}...`}</OverView>
              ) : (
                <NoItems word="Sorry, There are no items" />
              )}
              <TvTrailer>
                <Trailer>Trailer</Trailer>
                <TrailerPlay onClick={onVideoPlay}>
                  <FontAwesomeIcon icon={faPlay} />
                </TrailerPlay>
              </TvTrailer>
            </TvDescription>
          </TvIntro>
        </Cover>
        <AnimatePresence>
          {play && (
            <OverLay onClick={OffVideoPlay}>
              <PlayVideoBox layoutId={tvMatch?.params.id}>
                <iframe
                  title={tvVideo[0]?.name}
                  width="100%"
                  height="100%"
                  src={playVideo(tvVideo[0]?.key || tvVideo[1]?.key)}
                />
              </PlayVideoBox>
            </OverLay>
          )}
        </AnimatePresence>
      </SectionOne>

      <SectionTwo>
        {RecommendationItems ? (
          <Recommendation>
            <RecommendationName>Recommendation</RecommendationName>
            <RecommendationList>
              {RecommendationItems.map((item) => (
                <RecommendationItem key={item.id}>
                  <RecommendationItemImage
                    onClick={() => onDetailPage(item.id)}
                    bgPoster={makeImage(item.poster_path)}
                  ></RecommendationItemImage>
                  <RecommendationDescription>
                    <RecommendationTitle>{item.name}</RecommendationTitle>
                  </RecommendationDescription>
                </RecommendationItem>
              ))}
            </RecommendationList>
          </Recommendation>
        ) : (
          <NoItems word="Sorry, There are no items" />
        )}
      </SectionTwo>
    </Main>
  );
};

export default TVDetails;
