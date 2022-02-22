import { useEffect, useRef, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MovieDeTailPagesAPI } from "../../actions/DetailPage";
import { useAppDispatch, useAppSelector } from "../../store";
import makeImage, { playVideo } from "../../utility/utility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { getMovieVideo } from "../../actions/Video";
import { movieRecommendation } from "../../actions/RecommendationAPIs";
import NoItems from "../../components/Noiitem";
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

const MovieIntro = styled.div`
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

const MoviePoster = styled(motion.div)`
  margin-right: var(--margin-size-meddle);
  flex: 30%;
  width: 18.75em;
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

const MovieDescription = styled.div`
  flex: 70%;
  @media screen and (max-width: 48em) {
    flex: 60%;
  }
`;

const MovieTitle = styled.div`
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

const MovieTrailer = styled.div`
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
const Bar = styled.div`
  margin: var(--margin-size-middle) 0;
  width: 90%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.5);
`;

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
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
    transform: translateY(-10px);
  }
`;

const MovieDetail = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const navigator = useNavigate();
  const [play, setPlay] = useState(false);
  const movieMatch = useMatch("/movie-detail/:id");
  const dispatch = useAppDispatch();
  const movieVideo = useAppSelector((state) => state.VideoSlice.videoData);
  const movieDetailItem = useAppSelector((state) => state.Details.MovieDetails);
  const loading = useAppSelector((state) => state.Details.loadingState);
  const RecommendationItems = useAppSelector(
    (state) => state.RecommendationSlice.movieData
  );
  useEffect(() => {
    dispatch(MovieDeTailPagesAPI(Number(movieMatch?.params.id)));
    dispatch(getMovieVideo(Number(movieMatch?.params.id)));
    dispatch(movieRecommendation(Number(movieMatch?.params.id)));
  }, [dispatch, movieMatch?.params.id]);

  const onVideoPlay = () => {
    setPlay(true);
  };

  const OffVideoPlay = () => {
    setPlay(false);
  };

  const onDetailPage = (id: number) => {
    navigator(`/movie-detail/${id}`);
    titleRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  };

  return loading ? (
    <LoadingState></LoadingState>
  ) : (
    <Main>
      <SectionOne background={makeImage(movieDetailItem.poster_path)}>
        <Cover>
          <MovieIntro>
            <MoviePoster layoutId={movieMatch?.params.id}>
              <PosterImg
                poster={makeImage(movieDetailItem.poster_path)}
              ></PosterImg>
            </MoviePoster>
            <MovieDescription>
              <MovieTitle>
                <Title ref={titleRef}>{movieDetailItem.original_title}</Title>
                <TitleSubInfo>
                  <Release>{movieDetailItem.release_date}</Release>
                  <GenresArray>
                    {movieDetailItem?.genres?.map((genre) => (
                      <Genres key={genre.id}>{genre.name}</Genres>
                    ))}
                  </GenresArray>
                  <Runtime>{`${movieDetailItem.runtime} 분`}</Runtime>
                </TitleSubInfo>
              </MovieTitle>
              <VoteAverage>
                <VoteAverageP>평점</VoteAverageP>
                <VoteAverageScore>
                  {movieDetailItem.vote_average}
                </VoteAverageScore>
              </VoteAverage>
              <OverView>
                {movieDetailItem.overview ? (
                  `${movieDetailItem.overview.slice(0, 120)}...`
                ) : (
                  <>
                    <NoItems word="Sorry, There are no items" />
                  </>
                )}
              </OverView>
              <MovieTrailer>
                <Trailer>Trailer</Trailer>
                <TrailerPlay onClick={onVideoPlay}>
                  <FontAwesomeIcon icon={faPlay} />
                </TrailerPlay>
              </MovieTrailer>
            </MovieDescription>
          </MovieIntro>
        </Cover>
        <AnimatePresence>
          {play && (
            <OverLay onClick={OffVideoPlay}>
              <PlayVideoBox layoutId={movieMatch?.params.id}>
                {movieVideo && (
                  <iframe
                    title={movieVideo[0]?.name}
                    width="100%"
                    height="100%"
                    src={playVideo(movieVideo[3]?.key)}
                  />
                )}
              </PlayVideoBox>
            </OverLay>
          )}
        </AnimatePresence>
      </SectionOne>
      <Bar />
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
                    <RecommendationTitle>{item.title}</RecommendationTitle>
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

export default MovieDetail;
