import styled from "styled-components";

interface ITapContents {
  id: string;
  one: string;
  two?: string;
}

const PageLi = styled.li`
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.color.active};
  }
`;

const NavbarTap = ({ ...tap }: ITapContents) => {
  const onTap = (id: string) => {
    console.log(id);
  };
  return <PageLi onClick={() => onTap(tap.id)}>{tap.id}</PageLi>;
};

export default NavbarTap;
