import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MovieDeTailPagesAPI, TvDetailPagesAPI } from "../actions/DetailPage";
import { getPopularMovies, getPopularTV } from "../actions/PopularAPIs";
import { SearchAPIs } from "../actions/SearchAPIs";
import LoadingState from "../components/LoadingState";
import { useAppDispatch, useAppSelector } from "../store";
import makeImage from "../utility/utility";
import TitleImage from "../bgImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Main = styled.main``;

const SectionOne = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--margin-size-large);
  height: 60vh;
  color: ${(props) => props.theme.color.mainFontColor};
`;

const HomeImage = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.darkColor};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PosterTitle = styled.div`
  width: 10em;
  height: 100%;
  top: 0;
  bottom: 0;
  font-size: 2em;
  position: absolute;
  background-image: url(${TitleImage});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  color: ${(props) => props.theme.color.whiteColor};
`;

const TitleBox = styled.div`
  margin-bottom: var(--margin-size-large);
`;

const PosterSubTitle = styled.h1`
  margin-top: var(--margin-size-meddle);
  font-weight: 600;
  font-style: italic;
  font-size: var(--font-size-large);
  color: ${(props) => props.theme.color.main};
`;

const Form = styled.form`
  width: 70%;
  text-align: center;
  border: 2px solid ${(props) => props.theme.color.main};
  border-radius: 50px;
  display: flex;
  padding: 0.5em 1em;
  @media screen and (max-width: 48em) {
    width: 100%;
  }
`;

const Input = styled.input`
  outline: 0;
  border-radius: 50px;
  border: 0;
  width: 70%;
  background-color: transparent;
  color: ${(props) => props.theme.color.mainFontColor};
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${(props) => props.theme.color.mainFontColor};
`;

const SectionTwo = styled.section`
  padding: var(--padding-size-large);
`;

const SlideBox = styled.div`
  margin-bottom: var(--margin-size-large);
`;

const SlideName = styled.p`
  font-size: var(--font-size-large);
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-regular);
  }
  color: ${(props) => props.theme.color.mainFontColor};
`;

const Slide = styled.div``;

const RowItems = styled.div`
  overflow-x: scroll;
  display: flex;
`;

const RowItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: var(--margin-size-meddle);
  padding: 2em 0;
  color: ${(props) => props.theme.color.mainFontColor};
`;

const ItemImg = styled.div<{ bgPoster: string }>`
  cursor: pointer;
  width: 10em;
  height: 15em;
  overflow-x: scroll;
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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
`;

const ItemTitle = styled.p`
  width: 100%;
  font-weight: 600;
  @media screen and (max-width: 64em) {
    font-size: var(--font-size-small);
  }
`;

const ItemRelease = styled.p`
  margin-top: var(--margin-size-small);
  font-size: var(--font-size-micro);
  color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.color.mainFontColor};
`;

const LeftMovieDirection = styled.div`
  width: 1.7em;
  height: 1.7em;
  top: 70%;
  left: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const RightMovieDirection = styled.div`
  width: 1.7em;
  height: 1.7em;
  top: 70%;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const LeftTvDirection = styled.div`
  width: 1.7em;
  height: 1.7em;
  top: 170%;
  left: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const RightTvDirection = styled.div`
  width: 1.7em;
  height: 1.7em;
  top: 170%;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.whiteColor};
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

interface IValue {
  value: string;
}

const Home = () => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(
    (state) => state.popularSlice.loadingState
  );
  const popularMovies = useAppSelector((state) => state.popularSlice.movieData);
  const popularTVs = useAppSelector((state) => state.popularSlice.tvData);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IValue>();

  const movieDirection = useRef<HTMLDivElement>(null);
  const tvDirection = useRef<HTMLDivElement>(null);

  const onMovieLeft = () => {
    movieDirection.current?.scrollBy({ left: -500, behavior: "smooth" });
  };
  const onMovieRight = () => {
    movieDirection.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  const onTvLeft = () => {
    tvDirection.current?.scrollBy({ left: -500, behavior: "smooth" });
  };
  const onTvRight = () => {
    tvDirection.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getPopularTV());
  }, [dispatch]);

  const onMovieDetail = useCallback(
    (id: number) => {
      navigator(`/movie-detail/${id}`);
      dispatch(MovieDeTailPagesAPI(id));
    },
    [dispatch, navigator]
  );

  const onTvDetail = useCallback(
    (id: number) => {
      navigator(`/tv-detail/${id}`);
      dispatch(TvDetailPagesAPI(id));
    },
    [dispatch, navigator]
  );

  const onValid = (data: IValue) => {
    setValue("value", "");
    navigator(`/search?keyword=${data.value}`);
    dispatch(SearchAPIs(data.value));
  };

  return (
    <Main>
      <SectionOne>
        <HomeImage>
          <PosterTitle></PosterTitle>
          <TitleBox>
            <PosterSubTitle>Shoot for the moon</PosterSubTitle>
          </TitleBox>
        </HomeImage>
        <Form onSubmit={handleSubmit<IValue>(onValid)}>
          <Input
            {...register("value", { required: "Please, Write your Keyword" })}
            placeholder={
              errors.value?.message
                ? errors.value.message
                : "??????, TV ????????????, ?????? ?????? ..."
            }
          />
          <Button>Search</Button>
        </Form>
      </SectionOne>

      {loadingState ? (
        <LoadingState></LoadingState>
      ) : (
        <SectionTwo>
          {/* movies */}
          <SlideBox>
            <SlideName>Popular Movies</SlideName>
            <Slide>
              <RowItems ref={movieDirection}>
                <RightMovieDirection onClick={onMovieRight}>
                  <FontAwesomeIcon
                    style={{ fontSize: "1.5em" }}
                    icon={faCaretRight}
                  />
                </RightMovieDirection>
                {popularMovies.map((movie) => (
                  <RowItem key={movie.id}>
                    <ItemImg
                      onClick={() => onMovieDetail(movie.id)}
                      bgPoster={makeImage(movie.poster_path, "w500")}
                    ></ItemImg>
                    <ItemDescription>
                      <ItemTitle>{movie.title}</ItemTitle>
                      <ItemRelease>{movie.release_date}</ItemRelease>
                    </ItemDescription>
                  </RowItem>
                ))}
                <LeftMovieDirection onClick={onMovieLeft}>
                  <FontAwesomeIcon
                    style={{ fontSize: "1.5em" }}
                    icon={faCaretLeft}
                  />
                </LeftMovieDirection>
              </RowItems>
            </Slide>
            {/* tvs */}
          </SlideBox>
          <SlideBox>
            <SlideName>Popular TV Programs</SlideName>
            <Slide>
              <RowItems ref={tvDirection}>
                <RightTvDirection onClick={onTvRight}>
                  <FontAwesomeIcon
                    style={{ fontSize: "1.5em" }}
                    icon={faCaretRight}
                  />
                </RightTvDirection>
                {popularTVs.map((tv) => (
                  <RowItem key={tv.id} onClick={() => onTvDetail(tv.id)}>
                    <ItemImg
                      bgPoster={makeImage(tv.poster_path, "w500")}
                    ></ItemImg>
                    <ItemDescription>
                      <ItemTitle>{tv.name}</ItemTitle>
                      <ItemRelease>{tv.first_air_date}</ItemRelease>
                    </ItemDescription>
                  </RowItem>
                ))}
                <LeftTvDirection onClick={onTvLeft}>
                  <FontAwesomeIcon
                    style={{ fontSize: "1.5em" }}
                    icon={faCaretLeft}
                  />
                </LeftTvDirection>
              </RowItems>
            </Slide>
          </SlideBox>
        </SectionTwo>
      )}
    </Main>
  );
};

export default Home;
