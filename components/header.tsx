import { useRouter } from "next/router";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();

  const doPush = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <Wrapper>
        <div className="container">
          <Nav>
            <li
              onClick={() => {
                doPush("/");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                doPush("/about");
              }}
            >
              About
            </li>
          </Nav>
        </div>
      </Wrapper>
    </>
  );
};

export default Header;

const Wrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.nav_color};
  backdrop-filter: blur(5px);
  position: sticky;
  top: 0;
  z-index: 10;
  .container {
    margin: 0 auto;
    width: 500px;
    height: 70px;
    ${({ theme }) => theme.mixin.flexCenter}
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
  li {
    cursor: pointer;
    font-size: 30px;
    &:hover {
      color: ${({ theme }) => theme.colors.background_color};
    }
  }
`;
