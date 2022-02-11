import styled from "styled-components";

const Word = styled.span`
  font-size: var(--font-size-micro);
  font-weight: 600;
`;

interface IWord {
  word: string;
}

const NoItems = ({ word }: IWord) => {
  return (
    <>
      <Word>{`${word} ...`}</Word>
    </>
  );
};

export default NoItems;
