import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    margin-bottom: 30px;
`

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

export const Title = styled.h3`
    font-weight: bold;
`

export const Subtitle = styled.h4``

export const Emblema = styled.img`
    width: 70px;
    margin-right: 15px;
`

export const Body = styled.div`
    margin-bottom: 30px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`

export const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #cecece;
    padding: 10px;
`