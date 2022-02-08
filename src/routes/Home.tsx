import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MovieDeTailPages } from "../actions/DetailPage";
import { getPopularMovies, getPopularTV } from "../actions/PopularMovies";
import LoadingState from "../components/LoadingState";
import { useAppDispatch, useAppSelector } from "../store";
import makeImage from "../utility/utility";

const Main = styled.main``;

const SectionOne = styled.section`
  margin-bottom: var(--margin-size-large);
`;

const HomeImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 500px;
  background-image: url(https://cdn.dribbble.com/users/31629/screenshots/17102576/media/93d66dc088259f09424c91bc5ccb5472.png?compress=1&resize=800x600&vertical=top);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const TitleBox = styled.div`
  position: relative;
  margin-bottom: 7em;
`;

const Description = styled.h1`
  margin-top: var(--margin-size-meddle);
  font-weight: 400;
  font-style: italic;
  font-size: var(--font-size-regular);
  color: ${(props) => props.theme.color.main};
`;

const Form = styled.form`
  position: relative;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  outline: 0;
  padding: 0.5em 1em;
  width: 70%;
  border: 2px solid ${(props) => props.theme.color.main};
  border-radius: 50px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 0;
`;

const SectionTwo = styled.section`
  padding: var(--padding-size-large);
`;

const SlideBox = styled.div`
  margin-bottom: var(--margin-size-large);
`;

const SlideName = styled.p`
  font-size: var(--font-size-large);
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
`;

const ItemRelease = styled.p`
  margin-top: var(--margin-size-small);
  font-size: var(--font-size-micro);
  color: rgba(0, 0, 0, 0.5);
`;

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
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getPopularTV());
  }, [dispatch]);

  const onMovieDetail = (id: number) => {
    navigator(`movies/${id}`);
    dispatch(MovieDeTailPages(id));
    console.log(id);
  };

  const onSubmit = () => {};
  return (
    <Main>
      <SectionOne>
        <HomeImage>
          <TitleBox>
            <Description>Shoot for the moon</Description>
          </TitleBox>
        </HomeImage>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("value", { required: true })}
            placeholder="영화, TV 프로그램, 인물 검색 ..."
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
              <RowItems>
                {popularMovies.map((movie) => (
                  <RowItem
                    onClick={() => onMovieDetail(movie.id)}
                    key={movie.id}
                  >
                    <ItemImg
                      bgPoster={makeImage(movie.poster_path, "w500")}
                    ></ItemImg>
                    <ItemDescription>
                      <ItemTitle>{movie.title}</ItemTitle>
                      <ItemRelease>{movie.release_date}</ItemRelease>
                    </ItemDescription>
                  </RowItem>
                ))}
              </RowItems>
            </Slide>
            {/* tvs */}
          </SlideBox>
          <SlideBox>
            <SlideName>Popular TV Programs</SlideName>
            <Slide>
              <RowItems>
                {popularTVs.map((tv) => (
                  <RowItem key={tv.id}>
                    <ItemImg
                      bgPoster={makeImage(tv.poster_path, "w500")}
                    ></ItemImg>
                    <ItemDescription>
                      <ItemTitle>{tv.name}</ItemTitle>
                      <ItemRelease>{tv.first_air_date}</ItemRelease>
                    </ItemDescription>
                  </RowItem>
                ))}
              </RowItems>
            </Slide>
          </SlideBox>
        </SectionTwo>
      )}
    </Main>
  );
};

export default Home;
