import styled from "styled-components";

export const Container = styled.div`
  padding: 80px;
  max-width: 800px;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .logo {
    width: 100px;
  }
`;

export const Title = styled.h4`
  text-transform: uppercase;
`;
