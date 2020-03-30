import styled from "styled-components";

export const Container = styled.div`
  position: ${props => (props.isMapExpanded ? "fixed" : "relative")};
  left: 0;
  top: 0;
  width: 100%;
  height: ${props => (props.isMapExpanded ? "100%" : "380px")};
  background-color: ${props =>
    props.isMapExpanded && "rgba(99, 114, 130, 0.5)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  position: relative;
  width: ${props => (props.isMapExpanded ? "96%" : "100%")};
  height: ${props => (props.isMapExpanded ? "96%" : "100%")};
`;

export const Header = styled.div`
  position: absolute;
  top: 5;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
  width: 100%;
  height: 40px;
  /* background-color: red; */
  padding: 10px;
  height: 60px;
`;

export const Title = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  padding: 10px;
`;

export const CardMenu = styled.div`
  width: auto;
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    li {
      margin-left: 15;
      background-color: white;
    }
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
`;
