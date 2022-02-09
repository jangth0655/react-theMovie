import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding-size-large);
`;

const H1 = styled.h1`
  font-size: var(--font-size-small);
  font-weight: 600;
`;

interface IWord {
  word: string;
}

const NoItems = ({ word }: IWord) => {
  return (
    <Section>
      <H1>{`${word} ...`}</H1>
    </Section>
  );
};

export default NoItems;
