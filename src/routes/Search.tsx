import styled from "styled-components";
import NoItems from "../components/Noiitem";
import { useAppSelector } from "../store";
import makeImage from "../utility/utility";

const Main = styled.main`
  padding: 6em 3em 3em 3em;
`;

const ItemList = styled.ul``;

const ItemLi = styled.li`
  display: flex;
  margin-bottom: var(--margin-size-large);
`;

const ImageBox = styled.div`
  width: 10em;
  height: 10em;
`;

const ItemImage = styled.div<{ bgPoster: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;

  background-position: center center;
`;

const ItemDescription = styled.div`
  padding: var(--padding-size-meddle);
`;

const ItemTitle = styled.p``;

const ItemDate = styled.p``;

const ItemOverview = styled.p`
  width: fit-content;
  width: 15em;
`;

const Search = () => {
  const items = useAppSelector((state) => state.searchSlice.data);
  const loading = useAppSelector((state) => state.searchSlice.loadingState);

  return (
    <Main>
      {loading ? (
        "loading...."
      ) : (
        <ItemList>
          {items.map((item) => (
            <ItemLi key={item.id}>
              <ImageBox>
                <ItemImage bgPoster={makeImage(item.poster_path)}></ItemImage>
              </ImageBox>
              <ItemDescription>
                <ItemTitle>{item.title}</ItemTitle>
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
      )}
    </Main>
  );
};

export default Search;
