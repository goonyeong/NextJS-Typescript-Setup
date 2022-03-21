import styled from "styled-components";

const Header = () => {
  return (
    <>
      <Wrapper>
        <div className="container">
          <Nav>
            <li>Home</li>
            <li>About</li>
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
