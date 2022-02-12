import styled, { keyframes } from "styled-components";

const Main = styled.main`
  z-index: 1;
  position: absolute;
  width: 100vw;
  background-color: ${(props) => props.theme.color.black};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IsLoading = keyframes`
  0% {
    transform : rotate(0deg);
    border-top : white;
  }
 
  50% {
    transform: rotate(180deg);
    border-bottom: black;   
  } 
 
  100% {
    transform: rotate(360deg);
    border-top: white;
  }
`;

const Loading = styled.div`
  margin-bottom: var(--margin-size-large);
  width: 100px;
  height: 100px;
  border: 3px solid white;
  border-radius: 50%;
  animation: ${IsLoading} 1s linear infinite;
`;

const LoadingTitle = styled.p`
  color: ${(props) => props.theme.color.whiteColor};
  font-size: var(--font-size-regular);
`;

const LoadingState = () => {
  return (
    <Main>
      <LoadingBox>
        <Loading></Loading>
        <LoadingTitle>Loading...</LoadingTitle>
      </LoadingBox>
    </Main>
  );
};

export default LoadingState;
