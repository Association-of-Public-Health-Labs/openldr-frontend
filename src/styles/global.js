import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
   
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: Open Sans, sans-serif;
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text};
        /* font-size: 14px; */
        /* font-size: 1rem; */
  /* font-weight: 400; */
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: inherit;
        font-weight: 600;
    }
`;
