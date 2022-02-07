import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { getPopularMovies } from "../actions/PopularMovies";
import { useAppDispatch, useAppSelector } from "../store";

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
  background-color: red;
`;

const SlideName = styled.p``;

const Slide = styled.div``;

const RowItems = styled.div``;

const Home = () => {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector(
    (state) => state.popularSlice.loadingState
  );
  const popularMovies = useAppSelector((state) => state.popularSlice.movieData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(popularMovies);
  console.log(loadingState);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

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

      <SectionTwo>
        <SlideName>Popular Movies</SlideName>
        <Slide>
          <RowItems></RowItems>
        </Slide>
      </SectionTwo>
    </Main>
  );
};

export default Home;
