import styled from "styled-components";

export const Container = styled.div`
  #chartWrapper {
    position: relative;
    width: 100%;
    height: 100%;

    [class$="-legend"] {
      list-style: none;
      cursor: pointer;
      padding-left: 0;
    }

    [class$="-legend"] li {
      display: inline-block;
      padding: 0 5px;
      /* display: flex; */
      flex-direction: row;
      align-items: center;
    }

    [class$="-legend"] li.hidden {
      text-decoration: line-through;
    }

    [class$="-legend"] li span {
      display: inline-block;
      height: 14px;
      margin-right: 5px;
      width: 40px;
      border: 2px solid #ececec;
    }
  }

  #chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }

  #chartAreaWrapper {
    width: 600px;
    overflow-x: scroll;
    #chartAreaWrapper2 {
      /* width: 1200px; */
    }
  }
`;
