import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingState from "../components/LoadingState";
import NoItems from "../components/Noiitem";
import { useAppSelector } from "../store";
import makeImage from "../utility/utility";

const Main = styled.main`
  padding: 6em 3em 3em 3em;
`;

const ItemList = styled.ul``;

const ItemLi = styled.li`
  height: 10em;
  display: flex;
  margin-bottom: var(--margin-size-large);
  -webkit-box-shadow: 0px 5px 9px 0px #000000;
  box-shadow: 0px 5px 9px 0px #000000;
  border-radius: var(--border-radius);
`;

const ItemImage = styled.div<{ bgPoster: string }>`
  cursor: pointer;
  flex: 20%;
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;
  border-radius: var(--border-radius);
  background-position: center center;
`;

const ItemDescription = styled.div`
  padding: var(--padding-size-meddle);
  flex: 80%;
  color: ${(props) => props.theme.color.mainFontColor};
`;

const ItemTitle = styled.p``;

const ItemDate = styled.p`
  margin: var(--margin-size-small) 0;
`;

const ItemOverview = styled.p`
  width: fit-content;
  @media screen and (max-width: 48em) {
    font-size: var(--font-size-micro);
  }
`;

enum mediaType {
  Movie = "movie",
  TV = "tv",
}

const Search = () => {
  const navigate = useNavigate();
  const items = useAppSelector((state) => state.searchSlice.data);
  const loading = useAppSelector((state) => state.searchSlice.loadingState);

  const onDetailPage = (media: string, id: number) => {
    switch (media) {
      case mediaType.Movie:
        navigate(`/movie-detail/${id}`);
        break;
      case mediaType.TV:
        navigate(`/tv-detail/${id}`);
        break;
    }
  };

  return loading ? (
    <LoadingState />
  ) : (
    <Main>
      <ItemList>
        {items.map((item) => (
          <ItemLi key={item.id}>
            <ItemImage
              onClick={() => onDetailPage(item.media_type, item.id)}
              bgPoster={makeImage(item.poster_path)}
            ></ItemImage>
            <ItemDescription>
              {item.title ? (
                <ItemTitle>{item.title}</ItemTitle>
              ) : (
                <>
                  <NoItems word=" There is no Title "></NoItems>
                </>
              )}

              <ItemDate>{item.release_date}</ItemDate>
              {item.overview ? (
                <ItemOverview>{`${item.overview.slice(
                  0,
                  100
                )}...`}</ItemOverview>
              ) : (
                <>
                  <NoItems word="Sorry, There is no overview "></NoItems>
                </>
              )}
            </ItemDescription>
          </ItemLi>
        ))}
      </ItemList>
    </Main>
  );
};

export default Search;
